import { db } from "@/db/drizzle";
import { flow, flowStep, userFlow } from "@/db/schema";
import { verifySession } from "@/lib/dal";
import { fullStepType } from "@/types/step";
import { displayUserFlow } from "@/types/userflow";
import { eq } from "drizzle-orm";

export const useMyFlowList = async (): Promise<displayUserFlow[]> => {
  const session = await verifySession();
  const raw = await db.select().from(userFlow).innerJoin(flow, eq(userFlow.fkFlowId, flow.id)).leftJoin(flowStep, eq(flowStep.fkFlowId, userFlow.fkFlowId)).where(eq(userFlow.fkUserId, session.uid)).orderBy(flowStep.order);

  // Use a Map to group by user flow ID
  const flowMap = new Map<number, displayUserFlow>();

  raw.forEach((item) => {
    const userFlowId = item.user_flow.id;

    if (!flowMap.has(userFlowId)) {
      flowMap.set(userFlowId, {
        ...item.user_flow,
        title: item.flow.title,
        steps: [] as fullStepType[],
      });
    }

    if (item.flow_step) {
      flowMap.get(userFlowId)!.steps.push(item.flow_step as fullStepType);
    }
  });

  return Array.from(flowMap.values());
};
