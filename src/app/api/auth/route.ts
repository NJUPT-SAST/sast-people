import { getSignature } from "@/server/user/feishu";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url")
  if (!url) {
    return NextResponse.json({ message: "url is required" }, { status: 400 });
  }
  const params = await getSignature(url);
  return NextResponse.json(params);
}