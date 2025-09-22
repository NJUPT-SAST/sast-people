import { SESSION } from "@/const/cookie";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import "server-only";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

const httpOnly = process.env.NODE_ENV === "production" ? true : false;

export async function encrypt(payload: {
  role: number;
  uid: number;
  name: string;
  expiresAt: Date;
}) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function createSession(uid: number, name: string, role: number) {
  let expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  if (role === 0) {
    expiresAt = new Date(Date.now() + 12 * 60 * 60 * 1000);
  }
  const session = await encrypt({
    uid,
    expiresAt,
    name,
    role,
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION, session, {
    httpOnly: httpOnly,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION);
}

export async function updateSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION)?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  cookieStore.set(SESSION, session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}
