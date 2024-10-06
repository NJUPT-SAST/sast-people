"use client";
import React, { useState } from "react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Trash2, UserCog } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { banUser } from "@/action/user/ban";
import { toast } from "sonner";

export const RemoveUserInfoDialog = ({ uid }: { uid: number }) => {
	return (
		<Dialog>
			<DialogTrigger>
				<Trash2 className="mr-2 h-4 w-4 text-destructive" />
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>确定要封号吗？</DialogTitle>
					<DialogDescription>封号后用户将无法登录</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">取消</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button
							variant="destructive"
							onClick={async () => {
								toast.promise(banUser(uid), {
									loading: "正在封号...",
									success: "封号成功",
									error: "封号失败",
								});
							}}
						>
							确定
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
