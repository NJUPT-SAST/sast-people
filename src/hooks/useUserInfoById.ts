'use server';
import { db } from '@/db/drizzle';
import { user } from '@/db/schema';
import { verifyRole } from '@/lib/dal';
import { eq } from 'drizzle-orm';

export const useUserInfoById = async (id: number) => {
  await verifyRole(1);
  const userInfo = await db.select().from(user).where(eq(user.id, id)).limit(1);
  if (userInfo.length === 0) {
    throw new Error('User not found');
  }
  return userInfo[0];
};
