'use server';

import { addFlowTypeSchema } from '@/components/flowTypes/add';
import { db } from '@/db/drizzle';
import { flowType } from '@/db/schema';
import { verifyRole, verifySession } from '@/lib/dal';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function deleteFlowType(id: number) {
  await verifyRole(1);

  await db.delete(flowType).where(eq(flowType.id, id));

  revalidatePath('/dashboard/flow-types');
}
