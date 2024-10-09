import 'server-only';
import { db } from '@/db/drizzle';
import { flow, steps, user } from '@/db/schema';
import sendEmail from '@/queue/sendEmail';
import { eq } from 'drizzle-orm';
import { forward } from '@/action/flow/edit';

export default async function register(
  uid: number,
  currrentStepLabel: string,
  currentStepId: number,
  flowTypeId: number,
  flowId: number,
  currentStepOrder: number,
) {
  const phoneNumber = (
    await db
      .select({ phoneNumber: user.phoneNumber })
      .from(user)
      .where(eq(user.id, uid))
      .limit(1)
  )[0].phoneNumber;
  if (phoneNumber) {
    if (currrentStepLabel === 'register') {
      forward(flowId, flowTypeId, currentStepOrder, currentStepId);
    }
  }
}
