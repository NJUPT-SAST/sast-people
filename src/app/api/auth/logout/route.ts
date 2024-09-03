import { logout } from "@/app/action/user/auth";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	await logout();
	return redirect("/login");
}
