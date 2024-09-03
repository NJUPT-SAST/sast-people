import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/session";
import { cache } from "react";
import { redirect } from "next/navigation";

export const verifySession = cache(async () => {
	const cookie = cookies().get("session")?.value;
	const session = await decrypt(cookie);

	if (!session?.uid) {
		redirect("/login");
	}

	return { isAuth: true, uid: session.uid, role: session.role, name: session.name };
});
