import "server-only";
import { loginFromX } from "@/action/user/auth";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { get_user_access_token, get_user_info } from "@/action/user/link";

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams;
	const code = searchParams.get("code");
	if (!code) {
		return NextResponse.json(
			{ message: "code is required" },
			{ status: 400 }
		);
	}
	const cookieStore = cookies()
	const code_verifier = cookieStore.get("link_code_verifier")?.value;
	if (!code_verifier) {
		return NextResponse.json(
			{ message: "code_verifier is missing" },
			{ status: 400 }
		);
	}
	cookieStore.delete("link_code_verifier");
	const access_token = await get_user_access_token(code, code_verifier)
	if (!access_token) {
		return NextResponse.json(
			{ message: "get user access token failed" },
			{ status: 500 }
		);
	}
	const params = await get_user_info(access_token);
	if (!params) {
		return NextResponse.json(
			{ message: "get user info failed" },
			{ status: 500 }
		);
	}
	await loginFromX(params.userId.toUpperCase(), params.userId.toUpperCase(), "link");
	// } catch (err) {
	// 	return NextResponse.json(
	// 		{ message: "feishu auth failed" },
	// 		{ status: 500 }
	// 	);
	// }
	return redirect("/dashboard");
}
