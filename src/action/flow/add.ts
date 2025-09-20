'use server';
import { verifyRole, verifySession } from '@/lib/dal';
import { db } from '@/db/drizzle';
import { flow } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { addFlowSchema } from '@/components/flow/add';

export async function addFlow(values: z.infer<typeof addFlowSchema>) {
  const session = await verifySession();
  await verifyRole(1);

  await db.insert(flow).values({
    title: values.title,
    description: values.description,
    ownerId: session.uid,
    startedAt: values.startedAt,
    endedAt: values.endedAt,
  });

  revalidatePath('/dashboard/flow');
}
