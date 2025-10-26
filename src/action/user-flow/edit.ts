'use server';

import { db } from '@/db/drizzle';
import { flow, flowStep, userFlow } from '@/db/schema';
// TODO: for some status, send email to user
// import eventManager from '@/event';
import { verifyRole, verifySession } from '@/lib/dal';
import { and, asc, desc, eq, gt, inArray, lt, lte, sql } from 'drizzle-orm';

export const forward = async (
  userFlowId: number,
) => {
  await verifyRole(1);
  await db.update(userFlow).set({currentStepOrder: sql`${userFlow.currentStepOrder} + 1`}).where(eq(userFlow.id, userFlowId));
};

export const finish = async (
  userFlowId: number,
) => {
  await verifyRole(1);
  await db.update(userFlow).set({status: 'accepted'}).where(eq(userFlow.id, userFlowId));
};

export const reject = async (
  userFlowId: number,
) => {
  await verifyRole(1);
  await db.update(userFlow).set({status: 'rejected'}).where(eq(userFlow.id, userFlowId));
};

//   userFlowId: number,
//   currentStepOrder: number,

export const reopen = async (
  userFlowId: number,
) => {
  await verifyRole(1);
  await db.update(userFlow).set({status: 'ongoing'}).where(eq(userFlow.id, userFlowId));
};


export const backward = async (
  userFlowId: number,
) => {
  await verifyRole(1);
  await db.update(userFlow).set({currentStepOrder: sql`${userFlow.currentStepOrder} - 1`}).where(eq(userFlow.id, userFlowId));
};

export const batchUpdate = async (
  flowId: number,
  currentStepOrder: number,
) => {
  await verifyRole(1);
  const user = await verifySession();
  console.log(user.name, "batchUpdate", flowId, currentStepOrder);
  await db.update(userFlow).set({currentStepOrder: currentStepOrder}).where(eq(userFlow.fkFlowId, flowId));
};

export const batchEndByUid = async (
  flowId: number,
  currentStepOrder: number,
  statusStr: 'rejected' | 'accepted',
  uids: number[],
) => {
  await verifyRole(2);
  await db.update(userFlow).set({status: statusStr, currentStepOrder: currentStepOrder}).where(and(eq(userFlow.fkFlowId, flowId), inArray(userFlow.fkUserId, uids)));
};
