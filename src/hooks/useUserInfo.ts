'use server';

import { db } from '@/db/drizzle';
import { verifySession } from '../lib/dal';
import { user } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const useUserInfo = async () => {
  const session = await verifySession();
  const userInfo = await db.select().from(user).where(eq(user.id, session.uid));
  return userInfo[0];
};
