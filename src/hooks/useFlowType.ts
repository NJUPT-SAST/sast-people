"use server";
import { db } from "@/db/drizzle";
import { flowType } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
const useFlowType= async() => {

	const flowTypeList = await db
    .select()
    .from(flowType)
    .where(eq(flowType.isDeleted, false))
    .orderBy(desc(flowType.createdAt));
    return flowTypeList;
}
export default useFlowType;