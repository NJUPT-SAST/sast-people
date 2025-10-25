'use server';
import { user } from '@/db/schema';
import { db } from '@/db/drizzle';
import { eq } from 'drizzle-orm';
import { useLocalSelectedProbs } from '@/hooks/useLocalSelectedProbs';
import { useOpenUserFlow } from '@/hooks/useOpenUserFlow';

export const checkUserByStuID = async (data: string) => {
  const userInfo = await db.select().from(user).where(eq(user.studentId, data));
  if (userInfo.length > 0) return true;
  return false;
};

export const findUserByUid = async (uid: number) => {
  const userInfo = await db.select().from(user).where(eq(user.id, uid));
  if (userInfo.length != 1) throw new Error('错误的考生学号，请重新输入或扫描');
  return userInfo[0];
};

export const checkUserWithSelectedProbs = async (studentId: string) => {
  const currentFlowId = await useLocalSelectedProbs()?.flowTypeId;
  const openUserFlowId = await useOpenUserFlow(studentId);

  if ((currentFlowId ?? 0) === 0) {
    return {
      success: false,
      error: {
        message: "未选择批卷范围"
      }
    }
  }

  if (!openUserFlowId.includes(currentFlowId!)) {
    return {
      success: false,
      error: {
        message: "考生未报名批卷范围所属的流程"
      }
    }
  }

  const userInfo = await db.select().from(user).where(eq(user.studentId, studentId));
  if (userInfo.length > 0) return true;
  return false;
};