"use server";
import React from "react";
// TODO: v2 db import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// TODO: v2 db import { displayFlowType } from "@/types/flow";
// TODO: v2 db import { Badge } from "../ui/badge";
// TODO: v2 db import {
// TODO: v2 db 	HoverCard,
// TODO: v2 db 	HoverCardContent,
// TODO: v2 db 	HoverCardTrigger,
// TODO: v2 db } from "../ui/hover-card";
// TODO: v2 db import {
// TODO: v2 db 	Clock,
// TODO: v2 db 	CheckCircle,
// TODO: v2 db 	XCircle,
// TODO: v2 db 	AlertCircle,
// TODO: v2 db 	CircleDashed,
// TODO: v2 db } from "lucide-react";
// TODO: v2 db import { useFlowStepsInfo } from "@/hooks/useFlowStepsInfo";

// TODO: v2 db 
// // 定义状态图标映射
// const statusIcons = {
// 	pending: CircleDashed,
// 	ongoing: Clock,
// 	accepted: CheckCircle,
// 	rejected: XCircle,
// };

// const statusName = {
// 	pending: "未开始",
// 	ongoing: "进行中",
// 	accepted: "已通过",
// 	rejected: "未通过",
// };

// interface FlowCardProps {
// 	flow: displayFlowType;
// }

// export const FlowCard: React.FC<FlowCardProps> = async ({ flow }) => {
// 	const { flowTypeInfo } = flow;
// 	// TODO: v2 db const rawFlowSteps = await useFlowStepsInfo(flow.id);
// 	// TODO: v2 db const flowSteps = flowTypeInfo.steps.map((step) => {
// 	// TODO: v2 db 	const rawFlowStep = rawFlowSteps.find(
// 	// TODO: v2 db 		(rawFlowStep) => rawFlowStep.stepId === step.id
// 	// TODO: v2 db 	);
// 	// TODO: v2 db 	return {
// 	// TODO: v2 db 		...step,
// 	// TODO: v2 db 		status: rawFlowStep?.status,
// 	// TODO: v2 db 	};
// 	// TODO: v2 db });
// 	// TODO: v2 db const currentStepIndex = flowSteps.findIndex(
// 	// TODO: v2 db 	(step) => step.id === flow.currentStepId
// 	// TODO: v2 db );

// 	// 根据状态确定颜色
// 	const getStatusColor = (status: string) => {
// 		switch (status) {
// 			case "accepted":
// 				return "bg-primary";
// 			case "rejected":
// 				return "bg-destructive";
// 			case "ongoing":
// 				return "bg-blue-500";
// 			default:
// 				return "bg-muted";
// 		}
// 	};

// 	return (
// 		<Card className="w-full">
// 			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
// 				<CardTitle className="text-sm font-medium">
// 					{flowTypeInfo.name}
// 				</CardTitle>
// 				<Badge
// 					variant={
// 						flow.isAccepted === null
// 							? "secondary"
// 							: flow.isAccepted
// 							? "default"
// 							: "destructive"
// 					}
// 				>
// 					{flow.isAccepted === null
// 						? "流程进行中"
// 						: flow.isAccepted
// 						? "已通过考核"
// 						: "未通过考核"}
// 				</Badge>
// 			</CardHeader>
// 			<CardContent>
// 				<div className="flex items-center justify-between relative my-5">
// 					{/* 背景横线 */}
// 					<div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted z-10"></div>
// 					{flowTypeInfo.steps.map((step, index) => {
// 						const status = flowSteps[index].status;
// 						const Icon =
// 							statusIcons[status as keyof typeof statusIcons] ||
// 							AlertCircle;
// 						const nextStatus =
// 							index < flowTypeInfo.steps.length - 1
// 								? flowSteps[index + 1].status
// 								: null;

// 						return (
// 							<React.Fragment key={`${flow.id}-${index}-step`}>
// 								<HoverCard openDelay={100}>
// 									<HoverCardTrigger className="z-30">
// 										<div
// 											className={`w-14 h-14 rounded-full flex items-center justify-center text-sm
//                         ${
// 							index <= currentStepIndex
// 								? getStatusColor(status || "") + " text-white"
// 								: "bg-muted text-muted-foreground"
// 						}`}
// 										>
// 											<Icon className="w-6 h-6" />
// 										</div>
// 									</HoverCardTrigger>
// 									<HoverCardContent>
// 										<div className="space-y-2">
// 											<h4 className="text-sm font-semibold">
// 												{step.name}
// 											</h4>
// 											<p className="text-sm">
// 												{step.description}
// 											</p>
// 											<p className="text-xs text-muted-foreground">
// 												状态:{" "}
// 												{
// 													statusName[
// 														status as keyof typeof statusName
// 													]
// 												}
// 											</p>
// 										</div>
// 									</HoverCardContent>
// 								</HoverCard>
// 								{index < flowTypeInfo.steps.length - 1 && (
// 									<div
// 										className={`absolute top-1/2 h-0.5 z-20 ${getStatusColor(
// 											nextStatus || ""
// 										)}`}
// 										style={{
// 											left: `calc(${
// 												(index /
// 													(flowTypeInfo.steps.length -
// 														1)) *
// 												100
// 											}% + 7px)`,
// 											width: `calc(${
// 												100 /
// 												(flowTypeInfo.steps.length - 1)
// 											}% - 14px)`,
// 										}}
// 									></div>
// 								)}
// 							</React.Fragment>
// 						);
// 					})}
// 				</div>
// 				<p className="mt-4 text-sm text-muted-foreground">
// 					当前步骤: {flowTypeInfo.steps[currentStepIndex]?.name}
// 				</p>
// 				<p className="mt-2 text-xs text-muted-foreground">
// 					{flowTypeInfo.steps[currentStepIndex]?.description ||
// 						"流程已结束"}
// 				</p>
// 			</CardContent>
// 		</Card>
// 	);
// };
