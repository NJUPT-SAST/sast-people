"use server";
import { db } from "@/db/drizzle";
import { flow, userFlow } from "@/db/schema";
import event from "@/event";
import { and, eq, ne, inArray, isNull } from "drizzle-orm";

export const batchSendEmail = async (
  uid: number[],
  flowId: number,
  accept: boolean
) => {
  const userFlowIds = (
    await db
      .select()
      .from(userFlow)
      .where(
        and(
          eq(userFlow.fkFlowId, flowId),
          inArray(userFlow.fkUserId, uid),
          ne(userFlow.status, "accepted"),
          ne(userFlow.status, "rejected")
        )
      )
  ).map((userFlow) => userFlow.id);
  userFlowIds.forEach((userFlowId) => {
    event.offer(userFlowId, accept);
  });
};
