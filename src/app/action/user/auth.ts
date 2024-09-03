import "server-only";
import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { createSession, deleteSession } from "@/app/lib/session";
import { redirect } from "next/navigation";

export async function loginFromX(
	openid: string,
	userIdentifier: string,
	type: "feishu" | "link"
) {
	console.log("loginFromX", openid, userIdentifier, type);
	let uidList: { uid: number }[] | null = null;
	// check if openid exists
	if (type === "feishu") {
		uidList = await db
			.select({
				uid: user.id,
			})
			.from(user)
			.where(eq(user.feishuOpenId, openid));
		if (!uidList || uidList.length === 0) {
			uidList = await db
				.insert(user)
				.values({
					feishuOpenId: openid,
					name: userIdentifier,
				})
				.returning({ uid: user.id });
		}
	} else if (type === "link") {
		uidList = await db
			.select({
				uid: user.id,
			})
			.from(user)
			.where(eq(user.sastLinkOpenId, openid));
		if (!uidList || uidList.length === 0) {
			uidList = await db
				.insert(user)
				.values({
					sastLinkOpenId: openid,
					name: userIdentifier,
					studentId: userIdentifier,
				})
				.returning({ uid: user.id });
		}
	}
	if (uidList && uidList.length > 0) {
		await createSession(uidList[0].uid, userIdentifier, type);
	} else {
		throw new Error("login failed");
	}
}

export async function logout() {
	deleteSession();
	redirect("/login");
}
