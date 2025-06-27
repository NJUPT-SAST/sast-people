import 'server-only';
import { db } from '@/db/drizzle';
// TODO: v2 db import { flow, step, user } from '@/db/schema';
import { eq } from 'drizzle-orm';
// TODO: v2 db import { forward } from '@/action/flow/edit';

// TODO: v2 db 
// export default async function register(
//   uid: number,
//   currrentStepLabel: string,
//   currentStepId: number,
//   flowTypeId: number,
//   flowId: number,
//   currentStepOrder: number,
// ) {
//   const phoneNumber = (
//     await db
//       .select({ phoneNumber: user.phone })
//       .from(user)
//       .where(eq(user.id, uid))
//       .limit(1)
//   )[0].phoneNumber;
//   if (phoneNumber) {
//     if (currrentStepLabel === 'register') {
//       forward(flowId, flowTypeId, currentStepOrder, currentStepId);
//     }
//   }
// }
