import { db } from "@/db/drizzle";
import { flowType, user } from "@/db/schema";
import { eq } from "drizzle-orm";

export const useFlowTypeList = async () => {
	const flowTypeList = await db.select().from(flowType).orderBy(flowType.id);
	const res = await Promise.all(
		flowTypeList.map(async (college) => {
			const userInfo = await db
				.select({
					name: user.name,
				})
				.from(user)
				.where(eq(user.id, college.createBy))
				.limit(1);
			return {
				...college,
				createBy: userInfo[0].name,
			};
		})
	);
	return res;
};
