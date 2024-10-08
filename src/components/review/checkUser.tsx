'use server';
import { user } from '@/db/schema';
import { db } from '@/db/drizzle';
import { eq } from 'drizzle-orm';

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
