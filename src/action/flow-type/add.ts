"use server";

import { addFlowTypeSchema } from "@/components/flowTypes/add";
import { db } from "@/db/drizzle";
import { flowType } from "@/db/schema";
import { verifySession } from "@/lib/dal";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function addFlowType(values: z.infer<typeof addFlowTypeSchema>) {
	const session = await verifySession();

	await db.insert(flowType).values({
		name: values.name,
		description: values.description,
		createBy: session.uid,
		createdAt: new Date(),
		updatedAt: new Date(),
	});

    revalidatePath('/dashboard/flow-types')
}
