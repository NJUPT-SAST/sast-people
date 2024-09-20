import { db } from "@/db/drizzle";
import { flowType } from "@/db/schema";
import { eq } from "drizzle-orm";

export const useFlowTypeInfo = async (id: number) => {
  const flowTypeInfo = await db
    .select()
    .from(flowType)
    .where(eq(flowType.id, id));
  return flowTypeInfo[0];
};
