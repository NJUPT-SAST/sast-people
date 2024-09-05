"use server";

import { addFlowTypeSchema } from "@/components/flowTypes/add";
import { db } from "@/db/drizzle";
import { flowType } from "@/db/schema";
import { verifyRole, verifySession } from "@/lib/dal";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const updateFlowType = async (
	id: number,
	values: z.infer<typeof addFlowTypeSchema>
) => {
	await verifyRole(1);

	await db
		.update(flowType)
		.set({
			name: values.name,
			description: values.description,
			updatedAt: new Date(),
		})
		.where(eq(flowType.id, id));

	revalidatePath("/dashboard/flow-types");
};
