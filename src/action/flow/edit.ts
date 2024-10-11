'use server';
import { db } from '@/db/drizzle';
import { flow, flowStep, steps, status } from '@/db/schema';
import { verifyRole } from '@/lib/dal';
import { and, asc, desc, eq, gt, lt } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

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

  await db.transaction(async (tx) => {
    await tx
      .update(flow)
      .set({ currentStepId: nextStep[0].id })
      .where(eq(flow.id, flowId));

    await tx
      .update(flowStep)
      .set({ status: status.enumValues[1] })
      .where(
        and(eq(flowStep.flowId, flowId), eq(flowStep.stepId, currentStepId)),
      );

    await tx
      .update(flowStep)
      .set({ status: status.enumValues[3], startedAt: new Date() })
      .where(
        and(eq(flowStep.flowId, flowId), eq(flowStep.stepId, nextStep[0].id)),
      );
  });
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

  console.log(previousStep);

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

export const batchUpdate = async (flowTypeID: number, stepID: number, preStepID?: number) => {
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
}