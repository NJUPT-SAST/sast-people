'use server';
import { db } from '@/db/drizzle';
import { flow, userFlow } from '@/db/schema';
import event from '@/event';
import { and, eq, inArray, isNull } from 'drizzle-orm';

export const batchSendEmail = async (uid: number[], flowId: number, accept: boolean) => {
  const flowIds = (
    await db
      .select()
      .from(userFlow)
      .where(
        and(
          eq(userFlow.fkFlowId, flowId),
          inArray(userFlow.fkUserId, uid),
          eq(userFlow.status, accept ? "ongoing" : "rejected"),
        ),
      )
  ).map((userFlow) => userFlow.id);
  flowIds.forEach((flowId) => {
    event.offer(flowId, accept);
  });
};
