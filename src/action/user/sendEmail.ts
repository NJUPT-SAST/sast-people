'use server';
import { db } from '@/db/drizzle';
import { flow } from '@/db/schema';
import event from '@/event';
import { and, eq, inArray } from 'drizzle-orm';

export const batchSendEmail = async (uid: number[], flowTypeId: number) => {
  const flowIds = (
    await db
      .select()
      .from(flow)
      .where(and(eq(flow.flowTypeId, flowTypeId), inArray(flow.uid, uid)))
  ).map((flow) => flow.id);
  flowIds.forEach((flowId) => {
    event.offer(flowId);
  });
};
