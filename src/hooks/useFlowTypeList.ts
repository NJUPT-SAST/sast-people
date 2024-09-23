import { db } from "@/db/drizzle";
import { flowType, steps, user } from "@/db/schema";
import { displayFlowType } from "@/types/flow";
import { flowTypeType } from "@/types/flowType";
import { desc, eq } from "drizzle-orm";

export const useFlowTypeList = async (): Promise<flowTypeType[]> => {
  const flowTypeList = await db
    .select()
    .from(flowType)
    .orderBy(desc(flowType.createdAt));
  const res = await Promise.all(
    flowTypeList.map(async (flowType) => {
      const userInfo = await db
        .select({
          name: user.name,
        })
        .from(user)
        .where(eq(user.id, flowType.createBy))
        .limit(1);
      const stepsList = await db
        .select()
        .from(steps)
        .where(eq(steps.flowTypeId, flowType.id));
      return {
        ...flowType,
        createBy: userInfo[0].name,
        steps: stepsList,
      };
    })
  );
  return res;
};
