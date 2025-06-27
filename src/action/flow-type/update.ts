'use server';

import { addFlowTypeSchema } from '@/components/flowTypes/add';
import { db } from '@/db/drizzle';
// TODO: v2 db import { flowType, step } from '@/db/schema';
import { verifyRole, verifySession } from '@/lib/dal';
// TODO: v2 db import { stepType } from '@/types/step';
import { and, eq, notInArray } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// TODO: v2 db
// export const updateFlowType = async (
//   id: number,
//   values: z.infer<typeof addFlowTypeSchema>,
//   stepList: stepType[],
// ) => {
//   await verifyRole(1);

//   await db
//     .update(flowType)
//     .set({
//       name: values.name,
//       description: values.description,
//       updatedAt: new Date(),
//     })
//     .where(eq(flowType.id, id));

//   // 更新steps
//   for (const step of stepList) {
//     await db
//       .update(step)
//       .set({
//         label: step.label,
//         name: step.name,
//         description: step.description,
//         order: step.order,
//       })
//       .where(and(eq(step.flowTypeId, id), eq(step.order, step.order)));
//   }

//   // 删除不再存在的steps
//   await db.delete(step).where(
//     and(
//       eq(step.flowTypeId, id),
//       notInArray(
//         step.order,
//         stepList.map((step) => step.order),
//       ),
//     ),
//   );

//   // 添加新的steps
//   const existingSteps = await db
//     .select()
//     .from(step)
//     .where(eq(step.flowTypeId, id));
//   const newSteps = stepList.filter(
//     (step) =>
//       !existingSteps.some((existingStep) => existingStep.order === step.order),
//   );
//   if (newSteps.length > 0) {
//     await db.insert(step).values(
//       newSteps.map((step) => ({
//         ...step,
//         flowTypeId: id,
//       })),
//     );
//   }

//   revalidatePath('/dashboard/flow-types');
// };
