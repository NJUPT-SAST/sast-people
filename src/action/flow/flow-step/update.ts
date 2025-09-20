"use server";

import { db } from "@/db/drizzle";
import { flowStep } from "@/db/schema";
import { verifyRole } from "@/lib/dal";
import { fullStepType } from "@/types/step";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const updateFlowStep = async (
  id: number,
  stepList: fullStepType[]
) => {
  await verifyRole(1);
  console.debug(stepList);
  await db.transaction(async (tx) => {
    await tx.delete(flowStep).where(eq(flowStep.fkFlowId, id));

    await tx.insert(flowStep).values(
      stepList.map((step) => ({
        title: step.title,
        description: step.description,
        type: step.type as any,
        order: step.order,
        fkFlowId: id,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false,
      }))
    );
  });

  revalidatePath("/dashboard/flow");
};
