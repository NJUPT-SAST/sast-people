'use server';

import { addFlowTypeSchema } from '@/components/flowTypes/add';
import { db } from '@/db/drizzle';
import { examMap, flowType } from '@/db/schema';
import { verifyRole, verifySession } from '@/lib/dal';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

// TODO: v2 db 
// export async function deleteFlowType(id: number) {
//   await verifyRole(1);

//   await db
//     .update(flowType)
//     .set({ isDeleted: true })
//     .where(eq(flowType.id, id));

//   revalidatePath('/dashboard/flow-types');
// }
