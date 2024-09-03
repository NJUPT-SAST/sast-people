import React from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "./ui/card";
import { verifySession } from "@/app/lib/dal";
import { logout } from "@/app/action/user/auth";
import { redirect } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export const UserCard: React.FC = async () => {
	const session = await verifySession();
	return (
		<div className="mt-auto">
			<Card>
				<CardHeader>
					<CardTitle>
						{session?.name ? (session.name as string) : "未知用户"}
					</CardTitle>
					<CardDescription>
						{session.role == 0 ? "😸️ 新同学你好" : "讲师"}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Link href="/api/auth/logout">
						<Button
							size="sm"
							className="w-full"
							variant={"outline"}
							type="submit"
						>
							退出登录
						</Button>
					</Link>
				</CardContent>
			</Card>
		</div>
	);
};
