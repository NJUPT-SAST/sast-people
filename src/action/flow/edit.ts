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

export const batchUpdateByUid = async (
  flowTypeID: number,
  stepID: number,
  statusStr: 'ongoing' | 'pending' | 'rejected' | 'accepted',
  uids: number[],
  preStepID?: number,
) => {
  await verifyRole(1);
  const currentStepOrder = (
    await db
      .select({ currentStepOrder: steps.order })
      .from(steps)
      .where(eq(steps.id, stepID))
  )[0].currentStepOrder;
  const previousSteps = (
    await db
      .select()
      .from(steps)
      .where(lte(steps.order, currentStepOrder))
      .orderBy(desc(steps.order))
  ).map((step) => step.id);
  console.log(previousSteps);
  await db.transaction(async (tx) => {
    await tx
      .update(flowStep)
      .set({ status: status.enumValues[1], completedAt: new Date() })
      .where(and(inArray(flowStep.stepId, previousSteps)));

    await tx
      .update(flow)
      .set({ currentStepId: stepID })
      .where(and(eq(flow.flowTypeId, flowTypeID), inArray(flow.uid, uids)));
    await tx
      .update(flowStep)
      .set({ status: statusStr, startedAt: new Date() })
      .where(and(eq(flowStep.stepId, stepID), inArray(flowStep.flowId, uids)));
    if (statusStr === 'rejected') {
      await tx
        .update(flow)
        .set({ isAccepted: false })
        .where(and(eq(flow.flowTypeId, flowTypeID), inArray(flow.uid, uids)));
    }
  });
};
