'use server';

import { addFlowSchema } from '@/components/flow/add';
import { db } from '@/db/drizzle';
import { flow, flowStep } from '@/db/schema';
import { verifyRole, verifySession } from '@/lib/dal';
import { and, eq, notInArray } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { stepType } from '@/types/step';

export const updateFlow = async (
  id: number,
  values: z.infer<typeof addFlowSchema>,
  stepList: stepType[],
) => {
  await verifyRole(1);
  console.debug(stepList);

  await db
    .update(flow)
    .set({
      title: values.title,
      description: values.description,
      updatedAt: new Date(),
    })
    .where(eq(flow.id, id));

  // 更新steps
  for (const step of stepList) {
    await db
      .update(flowStep)
      .set({
        title: step.title,
        description: step.description,
        order: step.order,
        type: step.type as any,
        updatedAt: new Date(),
      })
      .where(and(eq(flowStep.fkFlowId, id), eq(flowStep.order, step.order)));
  }

  // 删除不再存在的steps
  await db.delete(flowStep).where(
    and(
      eq(flowStep.fkFlowId, id),
      notInArray(
        flowStep.order,
        stepList.map((step) => step.order),
      ),
    ),
  );

  // 添加新的steps
  const existingSteps = await db
    .select()
    .from(flowStep)
    .where(eq(flowStep.fkFlowId, id));
  const newSteps = stepList.filter(
    (step) =>
      !existingSteps.some((existingStep) => existingStep.order === step.order),
  );
  if (newSteps.length > 0) {
    await db.insert(flowStep).values(
      newSteps.map((step) => ({
        title: step.title,
        description: step.description,
        type: step.type as any,
        order: step.order,
        fkFlowId: id,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false,
      })),
    );
  }

  revalidatePath('/dashboard/flow');
};
