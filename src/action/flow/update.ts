"use server";

import { addFlowSchema } from "@/components/flow/add";
import { db } from "@/db/drizzle";
import { flow } from "@/db/schema";
import { verifyRole } from "@/lib/dal";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const updateFlow = async (
  id: number,
  values: z.infer<typeof addFlowSchema>
) => {
  await verifyRole(1);

  await db
    .update(flow)
    .set({
      title: values.title,
      description: values.description,
      startedAt: values.startedAt,
      endedAt: values.endedAt,
      updatedAt: new Date(),
    })
    .where(eq(flow.id, id));

  revalidatePath("/dashboard/flow");
};
