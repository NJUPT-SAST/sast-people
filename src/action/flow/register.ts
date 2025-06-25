'use server';
import { verifySession } from '@/lib/dal';
import { db } from '@/db/drizzle';
import { flow, flowStep, step, status, flowType, user } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import eventManager from '@/event';

export const register = async (flowTypeId: number, uid: number) => {
  // 检查用户是否已经报名了这个流程
  const existingFlow = await db
    .select()
    .from(flow)
    .innerJoin(flowType, eq(flow.flowTypeId, flowType.id))
    .where(and(eq(flow.uid, uid), eq(flow.flowTypeId, flowTypeId)))
    .limit(1);

  if (existingFlow.length > 0) {
    throw new Error('您已经报名了这个流程');
  }

  // 获取流程的所有步骤
  const flowSteps = await db
    .select()
    .from(step)
    .where(eq(step.flowTypeId, flowTypeId))
    .orderBy(step.order);

  if (flowSteps.length === 0) {
    throw new Error('该流程没有定义步骤');
  }

  const userPhoneNumber = (
    await db
      .select({ phoneNumber: user.phoneNumber })
      .from(user)
      .where(eq(user.id, uid))
      .limit(1)
  )[0].phoneNumber;

  if (!userPhoneNumber) {
    throw new Error('填写先个人信息');
  }

  // 开启事务
  return await db.transaction(async (tx) => {
    // 创建新的流程记录
    const [newFlow] = await tx
      .insert(flow)
      .values({
        uid: uid,
        flowTypeId: flowTypeId,
        currentStepId: flowSteps[0].id, // 设置为第一个步骤
        isAccepted: null,
      })
      .returning();

    // 为每个步骤创建 flowStep 记录
    await tx.insert(flowStep).values(
      flowSteps.map((step) => ({
        flowId: newFlow.id,
        stepId: step.id,
        status: step.order === 1 ? status.enumValues[3] : status.enumValues[0], // 使用枚举值
        startedAt: step.order === 1 ? new Date() : null, // 第一个步骤的开始时间为当前时间
      })),
    );
    revalidatePath('/flow');
    eventManager.register(
      uid,
      flowSteps[0].label,
      flowSteps[0].id,
      flowTypeId,
      newFlow.id,
      flowSteps[0].order,
    );
  });
};
