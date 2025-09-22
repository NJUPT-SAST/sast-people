'use server';
import { db } from '@/db/drizzle';
import { user } from '@/db/schema';
import { eq, or } from 'drizzle-orm';
import { createSession, deleteSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { userType } from '@/types/user';

export async function loginFromX(
  openid: string,
  userIdentifier: string,
  type: 'feishu' | 'link',
) {
  console.log('loginFrom', type, openid, userIdentifier);
  let uidList: Partial<userType>[] | null = null;
  // check if openid exists
  if (type === 'feishu') {
    uidList = await db.select().from(user).where(eq(user.feishuOpenid, openid));
    if (!uidList || uidList.length === 0) {
      uidList = await db
        .insert(user)
        .values({
          feishuOpenid: openid,
          name: userIdentifier,
          role: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning({
          id: user.id,
          name: user.name,
          isDeleted: user.isDeleted,
          role: user.role,
        });
    }
  } else if (type === 'link') {
    console.debug('link login', openid, userIdentifier);
    uidList = await db
      .select({
        id: user.id,
        name: user.name,
        linkOpenid: user.linkOpenid,
        isDeleted: user.isDeleted,
        role: user.role,
      })
      .from(user)
      .where(
        or(eq(user.linkOpenid, openid), eq(user.studentId, userIdentifier)),
      )
      .limit(1);
    if (!uidList || uidList.length === 0) {
      console.debug('link login insert', openid, userIdentifier);
      uidList = await db
        .insert(user)
        .values({
          linkOpenid: openid,
          name: userIdentifier,
          studentId: userIdentifier,
          role: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning({
          id: user.id,
          name: user.name,
          isDeleted: user.isDeleted,
          role: user.role,
        });
    } else {
      if (uidList[0].linkOpenid !== openid) {
        console.debug('link login update', openid, userIdentifier);
        await db
          .update(user)
          .set({
            linkOpenid: openid,
            updatedAt: new Date(),
          })
          .where(eq(user.id, uidList[0].id as number));
      }
    }
  }
  if (uidList && uidList.length > 0 && !uidList[0].isDeleted) {
    console.debug('login success', uidList[0]);
    await createSession(
      uidList[0].id as number,
      uidList[0].name || userIdentifier,
      uidList[0].role || 0,
    );
  } else {
    throw new Error('login failed');
  }
}

export async function loginFromTest(formData: FormData) {
  const studentId = formData.get('studentId') as string;
  console.log('loginFromTest', studentId);
  const uidList = await db
    .select({
      uid: user.id,
    })
    .from(user)
    .where(eq(user.studentId, studentId));
  if (uidList && uidList.length > 0) {
    await createSession(uidList[0].uid, studentId, 1);
    return uidList[0].uid;
  } else {
    throw new Error('login failed');
  }
}

export async function logout() {
  deleteSession();
  redirect('/login');
}
