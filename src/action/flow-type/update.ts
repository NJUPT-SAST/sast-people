"use server";

import { addFlowTypeSchema } from "@/components/flowTypes/add";
import { db } from "@/db/drizzle";
import { flowType, steps } from "@/db/schema";
import { verifyRole, verifySession } from "@/lib/dal";
import { stepType } from "@/types/step";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const updateFlowType = async (
	id: number,
	values: z.infer<typeof addFlowTypeSchema>,
	stepList: stepType[]
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
	
	// update steps
	await db.delete(steps).where(eq(steps.flowTypeId, id));
	await db.insert(steps).values(stepList.map((step)=>{
		return {
			...step,
			flowTypeId: id,
		}
	}));
	revalidatePath("/dashboard/flow-types");
};
