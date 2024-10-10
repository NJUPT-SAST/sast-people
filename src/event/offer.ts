import 'server-only';
import { db } from '@/db/drizzle';
import { flow, user } from '@/db/schema';
import { sendEmail } from '@/queue/sendEmail';
import { eq } from 'drizzle-orm';
import { mqClient } from '@/queue/client';

export default async function offer(flowId: number) {
  const uid = (
    await db
      .select({
        uid: flow.uid,
      })
      .from(flow)
      .where(eq(flow.id, flowId))
      .limit(1)
  )[0].uid;
  const studentId = (
    await db
      .select({ studentId: user.studentId })
      .from(user)
      .where(eq(user.id, uid))
      .limit(1)
  )[0].studentId;
  await mqClient.send({ name: sendEmail.name, data: { studentId } });
}
