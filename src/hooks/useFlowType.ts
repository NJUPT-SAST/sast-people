"use server";
import { db } from "@/db/drizzle";
import { flowType } from "@/db/schema";
import { desc } from "drizzle-orm";
const useFlowType= async() => {

	const flowTypeList = await db
    .select()
    .from(flowType)
    .orderBy(desc(flowType.createdAt));
    return flowTypeList;
}
export default useFlowType;