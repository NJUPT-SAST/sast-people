"use server";

import { IS_BINDING } from "@/const/cookie";
import { db } from "@/db/drizzle";
import { flow, user, userFlow } from "@/db/schema";
import { verifyRole } from "@/lib/dal";
import { userType } from "@/types/user";
import { eq, or } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "node:crypto";

export async function redirectSASTLink(isBinding: boolean) {
  const code_challenge = await useCodeChallenge(isBinding);
  const redirect_uri = await getCurrentRedirectUri();
  const url = `https://link.sast.fun/auth?client_id=${
    process.env.LINK_CLIENT_ID
  }&code_challenge=${code_challenge}&code_challenge_method=S256&redirect_uri=${encodeURIComponent(
    redirect_uri
  )}&response_type=code&scope=all&state=xyz`;
  console.log(url);
  return redirect(url);
}

export const get_user_access_token = async (
  code: string,
  code_verifier: string
) => {
  const formData = new FormData();
  const redirect_uri = await getCurrentRedirectUri();
  formData.append("client_id", process.env.LINK_CLIENT_ID!);
  formData.append("client_secret", process.env.LINK_CLIENT_SECRET!);
  formData.append("code", code);
  formData.append("code_verifier", code_verifier);
  formData.append("grant_type", "authorization_code");
  formData.append("redirect_uri", redirect_uri);
  const res = await fetch("https://link.sast.fun/apis/oauth2/token", {
    method: "POST",
    body: formData,
  }).then((res) => res.json());
  console.log(res);
  const access_token = res?.Data?.access_token;
  if (!access_token) {
    throw new Error("get access token failed");
  }
  return access_token;
};

export const get_user_info = async (access_token: string) => {
  const res = await fetch("https://link.sast.fun/apis/oauth2/userinfo", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }).then((res) => res.json());
  return res.Data;
};

function base64URLEncode(str: Buffer) {
  return str
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function sha256(buffer: Buffer | string) {
  return crypto.createHash("sha256").update(buffer).digest();
}

export async function useCodeChallenge(isBinding: boolean) {
  const code_verifier = base64URLEncode(crypto.randomBytes(32));
  const cookieStore = await cookies();
  const code_challenge = base64URLEncode(sha256(code_verifier));
  cookieStore.set("link_code_verifier", code_verifier);
  if (isBinding) {
    cookieStore.set(IS_BINDING, "1");
  }
  return code_challenge;
}

export async function getCurrentRedirectUri() {
  return (
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : "https://people.sast.fun") + "/api/auth/link"
  );
}

export async function bindingLinkAccount(studentId: string) {
  const session = await verifyRole(1);
  await db.transaction(async (tx) => {
    console.debug("binding link account", studentId);
    let uidList: Partial<userType>[] | null = null;
    uidList = await tx
      .select({
        id: user.id,
        linkOpenid: user.linkOpenid,
        studentId: user.studentId,
        email: user.email,
        phone: user.phone,
        college: user.college,
        major: user.major,
        isDeleted: user.isDeleted,
        role: user.role,
      })
      .from(user)
      .where(
        or(eq(user.id, session?.uid as number), eq(user.linkOpenid, studentId))
      );
    if (!uidList || uidList.length === 0) {
      throw new Error("User not found");
    } else if (uidList.length === 1) {
      if (uidList[0].id !== session?.uid) {
        throw new Error("Unknown feishu user");
      }
      if (uidList[0].linkOpenid === studentId) {
        console.debug("this link account has already been bound", studentId);
        return;
      }
      if (uidList[0].linkOpenid === null) {
        console.debug("binding link account update", studentId);
        await tx
          .update(user)
          .set({
            linkOpenid: studentId,
            studentId: studentId,
            updatedAt: new Date(),
          })
          .where(eq(user.id, uidList[0].id as number));
      }
    } else if (uidList.length === 2) {
      console.debug("binding link account merge", studentId);
      let feishuUser: Partial<userType> | null = null;
      let linkUser: Partial<userType> | null = null;
      if (uidList[0].linkOpenid === studentId) {
        feishuUser = uidList[1];
        linkUser = uidList[0];
      } else {
        feishuUser = uidList[0];
        linkUser = uidList[1];
      }
      if (feishuUser.id !== session?.uid) {
        throw new Error("Unknown feishu user");
      }
      const flowIds = await tx
        .select()
        .from(flow)
        .where(eq(flow.ownerId, linkUser?.id as number));
      if (flowIds.length > 0) {
        throw new Error(
          "This Link account has created flows, cannot be merged, please contact admin"
        );
      }
      await tx
        .update(userFlow)
        .set({ fkUserId: feishuUser?.id as number })
        .where(eq(userFlow.fkUserId, linkUser?.id as number));
      await tx.delete(user).where(eq(user.id, linkUser?.id as number));
      await tx
        .update(user)
        .set({
          linkOpenid: studentId,
          studentId: studentId,
          email: linkUser.email,
          phone: linkUser.phone,
          college: linkUser.college,
          major: linkUser.major,
          updatedAt: new Date(),
        })
        .where(eq(user.id, session?.uid as number));
    } else {
      throw new Error(
        "User merge error, too many users, please contact admin, uid:" +
          session?.uid
      );
    }
  });
}
