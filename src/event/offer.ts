import { db } from "@/db/drizzle";
import { flow, user } from "@/db/schema";
import { mqClient } from "@/queue/client";
import { sendEmail } from "@/queue/sendEmail";
import { eq } from "drizzle-orm";
import "server-only";

export default async function offer(flowId: number, accept: boolean) {
  const userInfo = (
    await db
      .select({
        // NOTE: highly dependent on the linkOpenid field
        // TODO: v2 db studentID: user.linkOpenid,
        name: user.name,
        // TODO: v2 db flowName: flowType.name,
      })
      .from(user)
      // TODO: v2 db .innerJoin(flow, eq(flow.userId, user.id))
      // TODO: v2 db .innerJoin(flowType, eq(flow.flowTypeId, flowType.id))
      .where(eq(flow.id, flowId))
      .limit(1)
  )[0];
  await mqClient.send({
    name: sendEmail.name,
    data: {
      // TODO: v2 db studentID: userInfo.studentID,
      name: userInfo.name,
      // TODO: v2 db flowName: userInfo.flowName,
      accept,
    },
  });
}
