import 'server-only';
import { db } from '@/db/drizzle';
import { flow, flowType, user } from '@/db/schema';
import { sendEmail } from '@/queue/sendEmail';
import { eq } from 'drizzle-orm';
import { mqClient } from '@/queue/client';

export default async function offer(flowId: number, accept: boolean) {
  const userInfo = (
    await db
      .select({
        // NOTE: highly dependent on the sastLinkOpenId field
        studentID: user.sastLinkOpenId,
        name: user.name,
        flowName: flowType.name,
      })
      .from(user)
      .innerJoin(flow, eq(flow.uid, user.id))
      .innerJoin(flowType, eq(flow.flowTypeId, flowType.id))
      .where(eq(flow.id, flowId))
      .limit(1)
  )[0];
  await mqClient.send({
    name: sendEmail.name,
    data: {
      studentID: userInfo.studentID,
      name: userInfo.name,
      flowName: userInfo.flowName,
      accept,
    },
  });
}
