"use server";
import { db } from "@/db/drizzle";
import { flow, flowStep } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { map } from "zod";
// TODO: v2 db 
const useFlowInfo= async(flowId: number) => {

	const flowInfoList = await db
    .select()
    .from(flow)
    .leftJoin(flowStep, eq(flow.id, flowStep.fkFlowId))
    .where(eq(flow.isDeleted, false))
    .orderBy(flowStep.order);
    const flowInfo = flowInfoList[0].flow;
    const flowSteps = flowInfoList.map((flow) => {
      return {
        ...flow.flow_step,
      };
    });
    return {
      ...flowInfo,
      steps: flowSteps,
    };
}

export default useFlowInfo;