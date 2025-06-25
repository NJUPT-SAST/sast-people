import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { flow, flowType, step } from "@/db/schema";
import { verifyRole, verifySession } from "@/lib/dal";

export const GET = async (req: NextRequest) => {
	await verifyRole(1);
	const searchParams = req.nextUrl.searchParams;
	const uid = Number(searchParams.get("uid"));
	if (!uid) {
		return NextResponse.json({ status: 400, body: "Invalid uid" });
	}
	const rawFlowList = await db.select().from(flow).where(eq(flow.uid, uid));
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
	return NextResponse.json(flowList);
};
