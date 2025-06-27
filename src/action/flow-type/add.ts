'use server';

import { addFlowTypeSchema } from '@/components/flowTypes/add';
import { db } from '@/db/drizzle';
import { flowType } from '@/db/schema';
import { verifyRole, verifySession } from '@/lib/dal';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// TODO: v2 db 
// export async function addFlowType(values: z.infer<typeof addFlowTypeSchema>) {
//   const session = await verifySession();
//   await verifyRole(1);

//   await db.insert(flowType).values({
//     name: values.name,
//     description: values.description,
//     createBy: session.uid,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   });

//   revalidatePath('/dashboard/flow-types');
// }
