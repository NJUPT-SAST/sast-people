"use server";

import { verifyRole } from "@/lib/dal";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { flow } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function deleteFlow(id: number) {
  await verifyRole(1);

  await db
    .update(flow)
    .set({ isDeleted: true, updatedAt: new Date() })
    .where(eq(flow.id, id));

  revalidatePath("/dashboard/flow");
}
