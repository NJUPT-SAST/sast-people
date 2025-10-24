import { loginFromX } from "@/action/user/auth";
import {
  bindingLinkAccount,
  get_user_access_token,
  get_user_info,
} from "@/action/user/link";
import { IS_BINDING } from "@/const/cookie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import "server-only";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  if (!code) {
    return NextResponse.json({ message: "code is required" }, { status: 400 });
  }
  const cookieStore = await cookies();
  const code_verifier = cookieStore.get("link_code_verifier")?.value;
  if (!code_verifier) {
    return NextResponse.json(
      { message: "code_verifier is missing" },
      { status: 400 }
    );
  }
  cookieStore.delete("link_code_verifier");
  
  const accessTokenResult = await get_user_access_token(code, code_verifier);
  if (!accessTokenResult.success) {
    return NextResponse.json(
      { message: accessTokenResult.error },
      { status: 500 }
    );
  }
  
  const access_token = accessTokenResult.data;
  
  const params = await get_user_info(access_token);
  if (!params) {
    return NextResponse.json(
      { message: "get user info failed" },
      { status: 500 }
    );
  }
  
  if (cookieStore.get(IS_BINDING)?.value === "1") {
    cookieStore.delete(IS_BINDING);
    const bindResult = await bindingLinkAccount(params.userId.toUpperCase());
    if (!bindResult.success) {
      return NextResponse.json(
        { message: bindResult.error },
        { status: 500 }
      );
    }
  } else {
    const loginResult = await loginFromX(
      params.userId.toUpperCase(),
      params.userId.toUpperCase(),
      "link"
    );
    if (!loginResult.success) {
      return NextResponse.json(
        { message: loginResult.error },
        { status: 500 }
      );
    }
  }

  return redirect("/dashboard");
}
