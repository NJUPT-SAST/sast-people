'use server';
import { verifyRole, verifySession } from '@/lib/dal';
import { db } from '@/db/drizzle';
import { flow, flowStep } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
// import { addFlowStepSchema } from '@/components/flow/';

// export async function addFlowStep(values: z.infer<typeof addFlowStepSchema>) {
//   const session = await verifySession();
//   await verifyRole(1);

//   await db.insert(flowStep).values({
//     title: values.title,
//     description: values.description,
//     type: values.type,
//     order: values.order,
//     fkFlowId: values.fkFlowId,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     isDeleted: false,
//   });

//   revalidatePath('/dashboard/flow/step');
// }
