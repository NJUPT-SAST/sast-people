"use server";
import { basicInfoSchema } from "@/components/userInfo/basic";
import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { verifySession } from "@/lib/dal";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function editBasicInfo(values: z.infer<typeof basicInfoSchema>) {
  const session = await verifySession();

  await db
    .update(user)
    .set({
      name: values.name,
      phone: values.phone,
      email: values.email,
      college: values.college,
      major: values.major,
      updatedAt: new Date(),
    })
    .where(eq(user.id, session.uid));

  revalidatePath("/dashboard");
  return { success: true };
}

export async function editBasicInfoByUid(
  uid: number,
  values: z.infer<typeof basicInfoSchema>
) {
  console.log("Server received values:", JSON.stringify(values));
  const session = await verifySession();

  if (session.role !== 1 && session.uid !== uid) {
    throw new Error("Permission denied");
  }

  await db
    .update(user)
    .set({
      ...values,
      updatedAt: new Date(),
    })
    .where(eq(user.id, uid));
  revalidatePath("/dashboard/manage");
  return { success: true };
}

// export async function editExperience(values: z.infer<typeof experienceSchema>) {
// 	const session = await verifySession();

// 	await db
// 		.update(user)
// 		.set({
// 			...values,
// 		})
// 		.where(eq(user.id, session.uid));
// }
