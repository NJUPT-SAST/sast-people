"use server";
import { db } from "@/db/drizzle";
import { flowStep } from "@/db/schema";
import { eq } from "drizzle-orm";

export const useFlowStepsInfo = async (flowId: number) => {
  const flowSteps = await db
    .select()
    .from(flowStep)
    .where(eq(flowStep.flowId, flowId));
  return flowSteps;
};
