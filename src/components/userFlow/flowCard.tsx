"use server";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import {
HoverCard,
HoverCardContent,
HoverCardTrigger,
} from "../ui/hover-card";
import {
Clock,
CheckCircle,
XCircle,
AlertCircle,
CircleDashed,
} from "lucide-react";
import { displayUserFlow } from "@/types/userflow";

// 定义状态图标映射
const statusIcons = {
	pending: CircleDashed,
	ongoing: Clock,
	accepted: CheckCircle,
	rejected: XCircle,
};

const statusName = {
	pending: "未开始",
	ongoing: "进行中",
	accepted: "已通过",
	rejected: "未通过",
};

interface FlowCardProps {
	flow: displayUserFlow;
}

export const FlowCard: React.FC<FlowCardProps> = async ({ flow }) => {
	const { currentStepOrder } = flow;
	// const flowInfo = await useFlowInfo(fkFlowId);


	// 根据状态确定颜色
	const getStatusColor = (status: string) => {
		switch (status) {
			case "accepted":
				return "bg-primary";
			case "rejected":
				return "bg-destructive";
			case "ongoing":
				return "bg-blue-500";
			default:
				return "bg-muted";
		}
	};

	return (
		<Card className="w-full">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">
					{flow.title}
				</CardTitle>
				<Badge
					variant={
						flow.status === 'ongoing' || flow.status === 'pending'
							? "secondary"
							: flow.status === 'accepted'
							? "default"
							: "destructive"
					}
				>
					{flow.status === 'ongoing' || flow.status === 'pending'
						? "流程进行中"
						: flow.status === 'accepted'
						? "已通过考核"
						: "未通过考核"}
				</Badge>
			</CardHeader>
			<CardContent>
				<div className="flex items-center justify-between relative my-5">
					{/* TODO: 需要重新适配新数据结构 */}
					<div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted z-10"></div>
					{flow.steps.map((step, index) => {
						const status = step?.order && step.order < currentStepOrder ? 'accepted' : step.order === currentStepOrder ? 'ongoing' : 'pending';
						const Icon =
							statusIcons[status as keyof typeof statusIcons] ||
							AlertCircle;
						const nextStatus =
							flow.status === 'accepted' || flow.status === 'rejected' ? flow.status : step.order < currentStepOrder ? 'accepted' : 'pending';
						return (
							<React.Fragment key={`${flow.id}-${index}-step`}>
								<HoverCard openDelay={100}>
									<HoverCardTrigger className="z-30">
										<div
											className={`w-14 h-14 rounded-full flex items-center justify-center text-sm
                        ${
							index <= currentStepOrder-1
								? getStatusColor(status || "") + " text-white"
								: "bg-muted text-muted-foreground"
						}`}
										>
											<Icon className="w-6 h-6" />
										</div>
									</HoverCardTrigger>
									<HoverCardContent>
										<div className="space-y-2">
											<h4 className="text-sm font-semibold">
												{step.title}
											</h4>
											<p className="text-sm">
												{step.description}
											</p>
											<p className="text-xs text-muted-foreground">
												状态:{" "}
												{
													statusName[
														status as keyof typeof statusName
													]
												}
											</p>
										</div>
									</HoverCardContent>
								</HoverCard>
								{index < flow.steps.length - 1 && (
									<div
										className={`absolute top-1/2 h-0.5 z-20 ${getStatusColor(
											nextStatus || ""
										)}`}
										style={{
											left: `calc(${
												(index /
													(flow.steps.length -
														1)) *
												100
											}% + 7px)`,
											width: `calc(${
												100 /
												(flow.steps.length - 1)
											}% - 14px)`,
										}}
									></div>
								)}
							</React.Fragment>
						);
					})}
				</div>
				<p className="mt-4 text-sm text-muted-foreground">
					当前步骤: {flow.steps[currentStepOrder-1]?.title || "（流程未开始）"}
				</p>
				<p className="mt-2 text-xs text-muted-foreground">
					{flow.steps[currentStepOrder-1]?.description ||
						"前面的区域以后再来探索吧"}
				</p>
			</CardContent>
		</Card>
	);
};
