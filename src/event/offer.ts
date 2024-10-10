import 'server-only';
import { db } from '@/db/drizzle';
import { flow, user } from '@/db/schema';
import { sendEmail } from '@/queue/sendEmail';
import { eq } from 'drizzle-orm';
import { mqClient } from '@/queue/client';

export default async function offer(flowId: number) {
  const studentID = (
    await db
      .select({
        studentID: user.studentId,
      })
      .from(user)
      .innerJoin(flow, eq(flow.uid, user.id))
      .where(eq(flow.id, flowId))
      .limit(1)
  )[0]?.studentID?.toLocaleLowerCase();
  await mqClient.send({ name: sendEmail.name, data: { studentID } });
}
