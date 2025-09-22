import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { cache } from "react";
import { redirect } from "next/navigation";
import { SESSION } from "@/const/cookie";

export const verifySession = cache(async () => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(SESSION)?.value;
  const session = await decrypt(cookie);

  if (!session?.uid) {
    redirect("/login");
  }

  return {
    isAuth: true,
    uid: Number(session.uid),
    role: session.role as number,
    name: session.name as string,
  };
});

export const verifyRole = cache(async (role: number) => {
  const session = await verifySession();
  if (session.role < role) {
    throw new Error("Unauthorized operation");
  }
  return session;
});
