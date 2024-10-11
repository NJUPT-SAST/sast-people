import 'server-only';
import { db } from '@/db/drizzle';
import { flow, user } from '@/db/schema';
import { sendEmail } from '@/queue/sendEmail';
import { eq } from 'drizzle-orm';
import { mqClient } from '@/queue/client';

export default async function offer(flowId: number) {
  const userInfo = (
    await db
      .select({
        studentID: user.studentId,
        name: user.name,
      })
      .from(user)
      .innerJoin(flow, eq(flow.uid, user.id))
      .where(eq(flow.id, flowId))
      .limit(1)
  )[0];
  await mqClient.send({
    name: sendEmail.name,
    data: { studentID: userInfo.studentID, name: userInfo.name },
  });
}
