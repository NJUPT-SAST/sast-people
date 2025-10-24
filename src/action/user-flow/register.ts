"use server";
import { verifySession } from "@/lib/dal";
import { db } from "@/db/drizzle";
import { flow, user, userFlow } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import eventManager from "@/event";
import { ActionResult } from "@/types/action";

export const register = async (flowId: number, uid: number): Promise<ActionResult> => {
  try {
    await db.transaction(async (tx) => {
      // 检查用户是否已经报名
      const existingFlow = await db
        .select({ id: userFlow.id })
        .from(userFlow)
        .where(and(eq(userFlow.fkFlowId, flowId), eq(userFlow.fkUserId, uid)))
        .limit(1);

      if (existingFlow.length > 0) {
        throw new Error("您已经报名了这个流程");
      }

      // 检查流程时间限制
      const flowInfo = await db
        .select({ 
          startedAt: flow.startedAt, 
          endedAt: flow.endedAt,
          title: flow.title 
        })
        .from(flow)
        .where(eq(flow.id, flowId))
        .limit(1);

      if (flowInfo.length === 0) {
        throw new Error("流程不存在");
      }

      const now = new Date();
      const { startedAt, endedAt, title } = flowInfo[0];

      if (now < startedAt) {
        throw new Error(`流程"${title}"尚未开始，开始时间为 ${startedAt.toLocaleString('zh-CN')}`);
      }

      if (now > endedAt) {
        throw new Error(`流程"${title}"已结束，结束时间为 ${endedAt.toLocaleString('zh-CN')}`);
      }

      const userPhoneNumber = (
        await db
          .select({ phoneNumber: user.phone })
          .from(user)
          .where(eq(user.id, uid))
          .limit(1)
      )[0].phoneNumber;

      if (!userPhoneNumber) {
        throw new Error("填写先个人信息");
      }

      const [newFlow] = await tx
        .insert(userFlow)
        .values({
          fkUserId: uid,
          fkFlowId: flowId,
          currentStepOrder: 1,
          status: "pending",
        })
        .returning();

      revalidatePath("/user-flow");
      eventManager.register(uid, flowId, newFlow.id);
    });
    
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "报名失败，请稍后再试"
    };
  }
};
