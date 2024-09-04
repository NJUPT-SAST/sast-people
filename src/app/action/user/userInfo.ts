"use server";
import { basicInfoSchema } from "@/app/components/userInfo/basic";
import { experienceSchema } from "@/app/components/userInfo/experience";
import { verifySession } from "@/app/lib/dal";
import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export async function editBasicInfo(values: z.infer<typeof basicInfoSchema>) {
	const session = await verifySession();

	console.log("editBasicInfo", values);

	await db
		.update(user)
		.set({
			...values,
			college: values.college ?? null,
			updatedAt: new Date(),
		})
		.where(eq(user.id, session.uid));
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
