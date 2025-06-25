import { db } from "@/db/drizzle";
import { flow, flowType, step } from "@/db/schema";
import { verifySession } from "@/lib/dal";
import { displayFlowType } from "@/types/flow";
import { eq } from "drizzle-orm";

export const useMyFlowList = async (): Promise<displayFlowType[]> => {
  const session = await verifySession();
  const rawFlowList = await db
    .select()
    .from(flow)
    .where(eq(flow.uid, session.uid));
  const flowList = await Promise.all(
    rawFlowList.map(async (flow) => {
      const flowTypeInfo = await db
        .select()
        .from(flowType)
        .where(eq(flowType.id, flow.flowTypeId ?? 0));
      const stepsList = await db
        .select()
        .from(step)
        .where(eq(step.flowTypeId, flow.flowTypeId ?? 0));
      return {
        ...flow,
        flowTypeInfo: { ...flowTypeInfo[0], steps: stepsList },
      };
    })
  );
  return flowList;
};
