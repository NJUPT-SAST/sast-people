import { db } from "@/db/drizzle";
import { displayFlow } from "@/types/flow";
import { flow, user, flowStep } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export const useFlowList = async (): Promise<displayFlow[]> => {
  const flowList = await db
    .select()
    .from(flow)
    .where(eq(flow.isDeleted, false))
    .orderBy(desc(flow.createdAt));
  const res = await Promise.all(
    flowList.map(async (flow) => {
      const userInfo = await db
        .select({
          name: user.name,
        })
        .from(user)
        .where(eq(user.id, flow.ownerId))
        .limit(1);
      const stepsList = await db
        .select()
        .from(flowStep)
        .where(eq(flowStep.fkFlowId, flow.id));
      return {
        ...flow,
        owner: userInfo[0].name,
        steps: stepsList,
      };
    })
  );
  return res;
};
