"use server";
import { basicInfoSchema } from "@/components/userInfo/basic";
import { experienceSchema } from "@/components/userInfo/experience";
import { verifyRole, verifySession } from "@/lib/dal";
import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export async function editBasicInfo(values: z.infer<typeof basicInfoSchema>) {
	const session = await verifySession();

	await db
		.update(user)
		.set({
			...values,
			college: Number(values.college) ?? null,
			updatedAt: new Date(),
		})
		.where(eq(user.id, session.uid));
}

export async function editBasicInfoByUid(
	uid: number,
	values: z.infer<typeof basicInfoSchema>
) {
	const session = await verifySession();

	if (session.role !== 1 && session.uid !== uid) {
		throw new Error("Permission denied");
	}

	await db
		.update(user)
		.set({
			...values,
			college: Number(values.college) ?? null,
			updatedAt: new Date(),
		})
		.where(eq(user.id, uid));
    revalidatePath('/dashboard/manage')
	return true;
}

export async function editExperience(values: z.infer<typeof experienceSchema>) {
	const session = await verifySession();

	await db
		.update(user)
		.set({
			...values,
			updatedAt: new Date(),
		})
		.where(eq(user.id, session.uid));
}
