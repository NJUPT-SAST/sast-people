"use client";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { Button } from "./ui/button";
import { QrCode } from "lucide-react";
import QRCode from "react-qr-code";
import originalDayjs from "@/lib/dayjs";

export const ShowQrCode = ({ uid }: { uid: string }) => {
	return (
		<Dialog>
			<DialogTrigger>
				<div className="flex gap-2">
					<QrCode size={24} />
					身份码
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>我的身份码</DialogTitle>
					<DialogDescription className="flex flex-col justify-center items-center gap-4">
						<div className="flex justify-center w-full mt-6">
							<QRCode
								value={btoa(
									JSON.stringify({
										uid,
										time: Date.now(),
									})
								)}
							/>
						</div>
						<p className="text-2xl text-black">
							<CurrentTime />
						</p>
						<p className="text-sm text-muted-foreground">
							请勿将此二维码分享给他人，请在批改试卷时展示给讲师
						</p>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

const CurrentTime = () => {
	const [currentTime, setCurrentTime] = React.useState(
		originalDayjs().format("HH:mm:ss")
	);

	React.useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(originalDayjs().format("HH:mm:ss"));
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return currentTime;
};
