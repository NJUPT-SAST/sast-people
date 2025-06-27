'use server';
import { db } from '@/db/drizzle';
import { user } from '@/db/schema';
import { eq, or, sql } from 'drizzle-orm';
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
  // TODO: v2 db 
  // if (type === 'feishu') {
  //   uidList = await db.select().from(user).where(eq(user.feishuOpenId, openid));
  //   if (!uidList || uidList.length === 0) {
  //     uidList = await db
  //       .insert(user)
  //       .values({
  //         feishuOpenId: openid,
  //         name: userIdentifier,
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //         role: 1,
  //       })
  //       .returning({
  //         uid: user.id,
  //         isDeleted: user.isDeleted,
  //         // TODO: v2 db role: user.role,
  //       });
  //   }
  // } else if (type === 'link') {
  //   uidList = await db
  //     .select()
  //     .from(user)
  //     .where(
  //       or(eq(user.sastLinkOpenId, openid), eq(user.studentId, userIdentifier)),
  //     )
  //     .limit(1);
  //   if (!uidList || uidList.length === 0) {
  //     uidList = await db
  //       .insert(user)
  //       .values({
  //         sastLinkOpenId: openid,
  //         name: userIdentifier,
  //         studentId: userIdentifier,
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //         role: 0,
  //       })
  //       .returning({
  //         uid: user.id,
  //         isDeleted: user.isDeleted,
  //         // TODO: v2 db role: user.role,
  //       });
  //   } else {
  //     if (uidList[0].sastLinkOpenId !== openid) {
  //       await db
  //         .update(user)
  //         .set({
  //           sastLinkOpenId: openid,
  //           updatedAt: new Date(),
  //         })
  //         .where(eq(user.id, uidList[0].id as number));
  //     }
  //   }
  // }
  // if (uidList && uidList.length > 0 && !uidList[0].isDeleted) {
  //   await createSession(
  //     uidList[0].id as number,
  //     userIdentifier,
  //     uidList[0].role || 0,
  //   );
  // } else {
  //   throw new Error('login failed');
  // }
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
