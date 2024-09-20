"use server";

import { addFlowTypeSchema } from "@/components/flowTypes/add";
import { db } from "@/db/drizzle";
import { flowType, steps } from "@/db/schema";
import { verifyRole, verifySession } from "@/lib/dal";
import { stepType } from "@/types/step";
import { and, eq, notInArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const updateFlowType = async (
  id: number,
  values: z.infer<typeof addFlowTypeSchema>,
  stepList: stepType[]
) => {
  await verifyRole(1);

  await db
    .update(flowType)
    .set({
      name: values.name,
      description: values.description,
      updatedAt: new Date(),
    })
    .where(eq(flowType.id, id));

  // 更新steps
  for (const step of stepList) {
    await db
      .update(steps)
      .set({
        label: step.label,
        name: step.name,
        description: step.description,
        order: step.order,
      })
      .where(and(eq(steps.flowTypeId, id), eq(steps.order, step.order)));
  }

  // 删除不再存在的steps
  await db.delete(steps).where(
    and(
      eq(steps.flowTypeId, id),
      notInArray(
        steps.order,
        stepList.map((step) => step.order)
      )
    )
  );

  // 添加新的steps
  const existingSteps = await db
    .select()
    .from(steps)
    .where(eq(steps.flowTypeId, id));
  const newSteps = stepList.filter(
    (step) =>
      !existingSteps.some((existingStep) => existingStep.order === step.order)
  );
  if (newSteps.length > 0) {
    await db.insert(steps).values(
      newSteps.map((step) => ({
        ...step,
        flowTypeId: id,
      }))
    );
  }

  revalidatePath("/dashboard/flow-types");
};
