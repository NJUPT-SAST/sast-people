import { db } from "@/db/drizzle";
import { flow, user, userFlow } from "@/db/schema";
import { mqClient } from "@/queue/client";
import { sendEmail } from "@/queue/sendEmail";
import { eq } from "drizzle-orm";
import "server-only";

export default async function offer(userFlowId: number, accept: boolean) {
  const userInfo = (
    await db
      .select({
        studentID: user.linkOpenid,
        name: user.name,
        flowName: flow.title,
      })
      .from(userFlow)
      .innerJoin(user, eq(user.id, userFlow.fkUserId))
      .innerJoin(flow, eq(flow.id, userFlow.fkFlowId))
      .where(eq(userFlow.id, userFlowId))
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
