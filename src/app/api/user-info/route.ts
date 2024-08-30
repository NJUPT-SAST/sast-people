import { get_user_access_token, get_user_info } from "@/server/user/feishu";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const body = await request.json();
	if (!body.code) {
		return NextResponse.json(
			{ message: "code is required" },
			{ status: 400 }
		);
	}
	const params = await get_user_access_token(body.code);
	const userInfoData = await get_user_info(
		params.user_access_token,
		params.open_id
	);
	return NextResponse.json({
		user: userInfoData.data?.user,
	});
}
