'use server';
import { db } from '@/db/drizzle';
import { flow, flowStep, steps, status } from '@/db/schema';
import eventManager from '@/event';
import { verifyRole } from '@/lib/dal';
import { and, asc, desc, eq, gt, inArray, lt, lte, sql } from 'drizzle-orm';

export const forward = async (
  flowId: number,
  flowTypeId: number,
  currentStepOrder: number,
  currentStepId: number,
) => {
  await verifyRole(1);
  const nextStep = await db
    .select()
    .from(steps)
    .where(
      and(gt(steps.order, currentStepOrder), eq(steps.flowTypeId, flowTypeId)),
    )
    .orderBy(asc(steps.order))
    .limit(1);

  if (nextStep.length === 0) {
    throw new Error('This is the last step');
  }

  // 自动触发 label 关联的事件
  if (eventManager[nextStep[0].label]) {
    eventManager[nextStep[0].label](flowId.toString());
  }

  const nextStepRecord = nextStep[0];
  const nextStepId = nextStepRecord.id;

  const updateSql = sql`
    WITH
    updated_flow AS (
      UPDATE "flow"
      SET "current_step_id" = ${nextStepId}
      WHERE "id" = ${flowId}
      RETURNING *
    ),
    updated_current_flowStep AS (
      UPDATE "flow_step"
      SET "status" = ${status.enumValues[1]}, "completed_at" = now()
      WHERE "flow_id" = ${flowId} AND "step_id" = ${currentStepId}
      RETURNING *
    ),
    updated_next_flowStep AS (
      UPDATE "flow_step"
      SET "status" = ${status.enumValues[3]}, "started_at" = now()
      WHERE "flow_id" = ${flowId} AND "step_id" = ${nextStepId}
      RETURNING *
    )
    SELECT 1;
  `;

  await db.execute<Record<string, unknown>>(updateSql);
};

// finish the last step
export const finish = async (
  flowId: number,
  currentStepOrder: number,
  currentStepId: number,
) => {
  await verifyRole(1);
  const currentStep = await db
    .select()
    .from(steps)
    .where(eq(steps.id, currentStepId))
    .limit(1);

  if (currentStep.length === 0) {
    throw new Error('Step not found');
  }

  await db.transaction(async (tx) => {
    await tx.update(flow).set({ isAccepted: true }).where(eq(flow.id, flowId));

    await tx
      .update(flowStep)
      .set({ status: status.enumValues[1] })
      .where(
        and(eq(flowStep.flowId, flowId), eq(flowStep.stepId, currentStepId)),
      );
  });
};

// reject any step
export const reject = async (
  flowId: number,
  currentStepOrder: number,
  currentStepId: number,
) => {
  await verifyRole(1);
  const currentStep = await db
    .select()
    .from(steps)
    .where(eq(steps.id, currentStepId))
    .limit(1);

  if (currentStep.length === 0) {
    throw new Error('Step not found');
  }

  await db.transaction(async (tx) => {
    await tx.update(flow).set({ isAccepted: false }).where(eq(flow.id, flowId));

    await tx
      .update(flowStep)
      .set({ status: status.enumValues[2] })
      .where(
        and(eq(flowStep.flowId, flowId), eq(flowStep.stepId, currentStepId)),
      );
  });
};

// reopen flow from the current step
export const reopen = async (
  flowId: number,
  currentStepOrder: number,
  currentStepId: number,
) => {
  await verifyRole(1);
  await db.transaction(async (tx) => {
    await tx.update(flow).set({ isAccepted: null }).where(eq(flow.id, flowId));

    await tx
      .update(flowStep)
      .set({ status: status.enumValues[3] })
      .where(
        and(eq(flowStep.flowId, flowId), eq(flowStep.stepId, currentStepId)),
      );
  });
};

export const backward = async (
  flowId: number,
  flowTypeId: number,
  currentStepOrder: number,
  currentStepId: number,
) => {
  await verifyRole(1);
  const previousStep = await db
    .select()
    .from(steps)
    .where(
      and(lt(steps.order, currentStepOrder), eq(steps.flowTypeId, flowTypeId)),
    )
    .orderBy(desc(steps.order))
    .limit(1);

  if (previousStep.length === 0) {
    throw new Error('This is the first step');
  }

  await db.transaction(async (tx) => {
    await tx
      .update(flow)
      .set({ currentStepId: previousStep[0].id })
      .where(eq(flow.id, flowId));

    await tx
      .update(flowStep)
      .set({ status: status.enumValues[0] })
      .where(
        and(eq(flowStep.flowId, flowId), eq(flowStep.stepId, currentStepId)),
      );

    await tx
      .update(flowStep)
      .set({ status: status.enumValues[3], startedAt: null })
      .where(
        and(
          eq(flowStep.flowId, flowId),
          eq(flowStep.stepId, previousStep[0].id),
        ),
      );
  });
};

export const batchUpdate = async (
  flowTypeID: number,
  stepID: number,
  preStepID?: number,
) => {
  await verifyRole(1);
  await db.transaction(async (tx) => {
    if (preStepID !== undefined) {
      await tx
        .update(flowStep)
        .set({ status: status.enumValues[1], completedAt: new Date() })
        .where(eq(flowStep.stepId, preStepID));
    }
    await tx
      .update(flow)
      .set({ currentStepId: stepID })
      .where(eq(flow.flowTypeId, flowTypeID));
    await tx
      .update(flowStep)
      .set({ status: status.enumValues[3], startedAt: new Date() })
      .where(eq(flowStep.stepId, stepID));
  });
};

export const batchEndByUid = async (
  flowTypeID: number,
  stepID: number,
  statusStr: 'rejected' | 'accepted',
  uids: number[],
  preStepID?: number,
) => {
  await verifyRole(1);
  const allSteps = (
    await db
      .select()
      .from(steps)
      .where(eq(steps.flowTypeId, flowTypeID))
      .orderBy(desc(steps.order))
  ).map((step) => step.id);
  const flowIds = (
    await db
      .select()
      .from(flow)
      .where(and(eq(flow.flowTypeId, flowTypeID), inArray(flow.uid, uids)))
  ).map((flow) => flow.id);
  await db.transaction(async (tx) => {
    if (statusStr === 'accepted') {
      await tx
        .update(flowStep)
        .set({ status: status.enumValues[1], completedAt: new Date() })
        .where(
          and(
            inArray(flowStep.stepId, allSteps),
            inArray(flowStep.flowId, flowIds),
          ),
        );
      await tx
        .update(flow)
        .set({ currentStepId: allSteps[0], isAccepted: true })
        .where(and(eq(flow.flowTypeId, flowTypeID), inArray(flow.uid, uids)));
    }
    if (statusStr === 'rejected') {
      const stepNeedUpdate = allSteps.findIndex((step) => step === stepID) - 1;
      const stepNeedFinish = allSteps.slice(stepNeedUpdate + 1);
      await tx
        .update(flowStep)
        .set({ status: status.enumValues[2] })
        .where(
          and(
            eq(flowStep.stepId, allSteps[stepNeedUpdate]),
            inArray(flowStep.flowId, flowIds),
          ),
        );
      await tx
        .update(flowStep)
        .set({ status: status.enumValues[1], completedAt: new Date() })
        .where(
          and(
            inArray(flowStep.stepId, stepNeedFinish),
            inArray(flowStep.flowId, flowIds),
          ),
        );
      await tx
        .update(flow)
        .set({ isAccepted: false, currentStepId: allSteps[stepNeedUpdate] })
        .where(and(eq(flow.flowTypeId, flowTypeID), inArray(flow.uid, uids)));
    }
  });
};
