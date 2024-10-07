"use client";
import React, { useMemo } from "react";
import {
	Clock,
	CheckCircle,
	XCircle,
	AlertCircle,
	CircleDashed,
	Icon,
	ArrowRight,
	ArrowLeft,
	X,
	LockOpen,
} from "lucide-react";
import { useFlowStepsInfo } from "@/hooks/useFlowStepsInfo";
import { displayFlowType } from "@/types/flow";
import {
	HoverCard,
	HoverCardTrigger,
	HoverCardContent,
} from "../ui/hover-card";
import { Badge } from "../ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { useFlowStepsInfoClient } from "@/hooks/useFlowStepsInfoClient";
import { Button } from "../ui/button";
import { backward, finish, forward, reject, reopen } from "@/action/flow/edit";
import { mutate } from "swr";

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
	flow: displayFlowType;
}

export const FlowCard = ({ flow }: FlowCardProps) => {
	const { data: rawFlowSteps } = useFlowStepsInfoClient(flow.id);
	const { flowTypeInfo } = flow;
	const flowSteps = flowTypeInfo.steps.map((step) => {
		const rawFlowStep =
			rawFlowSteps &&
			rawFlowSteps.find((rawFlowStep) => rawFlowStep.stepId === step.id);
		return {
			...step,
			status: rawFlowStep?.status,
		};
	});

	const currentStepIndex = useMemo(() => {
		return flowSteps.findIndex((step) => step.id === flow.currentStepId);
	}, [rawFlowSteps, flow.currentStepId]);

	const isLastStep = useMemo(() => {
		return currentStepIndex === flowTypeInfo.steps.length - 1;
	}, [currentStepIndex]);

	const [loading, setLoading] = React.useState(false);

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

	const handleForward = async () => {
		setLoading(true);
		await forward(
			flow.id,
			flow.flowTypeInfo.id,
			flowSteps[currentStepIndex].order,
			flowSteps[currentStepIndex].id
		);
		await mutate(`/api/flow?uid=${flow.uid}`);
		await mutate(`/api/flow/${flow.id}`);
		setLoading(false);
	};

	const handleBackward = async () => {
		setLoading(true);
		await backward(
			flow.id,
			flow.flowTypeInfo.id,
			flowSteps[currentStepIndex].order,
			flowSteps[currentStepIndex].id
		);
		await mutate(`/api/flow?uid=${flow.uid}`);
		await mutate(`/api/flow/${flow.id}`);
		setLoading(false);
	};

	const handleLastStep = async () => {
		setLoading(true);
		await finish(
			flow.id,
			flowSteps[currentStepIndex].order,
			flowSteps[currentStepIndex].id
		);
		await mutate(`/api/flow?uid=${flow.uid}`);
		await mutate(`/api/flow/${flow.id}`);
		setLoading(false);
	};

	const handleReject = async () => {
		setLoading(true);
		await reject(
			flow.id,
			flowSteps[currentStepIndex].order,
			flowSteps[currentStepIndex].id
		);
		await mutate(`/api/flow?uid=${flow.uid}`);
		await mutate(`/api/flow/${flow.id}`);
		setLoading(false);
	};

	const handleReopen = async () => {
		setLoading(true);
		await reopen(
			flow.id,
			flowSteps[currentStepIndex].order,
			flowSteps[currentStepIndex].id
		);
		await mutate(`/api/flow?uid=${flow.uid}`);
		await mutate(`/api/flow/${flow.id}`);
		setLoading(false);
	};

	return (
		<Card className="w-full">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">
					{flowTypeInfo.name}
				</CardTitle>
				<Badge
					variant={
						flow.isAccepted === null
							? "secondary"
							: flow.isAccepted
							? "default"
							: "destructive"
					}
				>
					{flow.isAccepted === null
						? "流程进行中"
						: flow.isAccepted
						? "已通过考核"
						: "未通过考核"}
				</Badge>
			</CardHeader>
			<CardContent>
				<div className="flex items-center justify-between relative my-5">
					{/* 背景横线 */}
					<div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted z-10"></div>
					{flowTypeInfo.steps.map((step, index) => {
						const status = flowSteps[index].status;
						const Icon =
							statusIcons[status as keyof typeof statusIcons] ||
							AlertCircle;
						const nextStatus =
							index < flowTypeInfo.steps.length - 1
								? flowSteps[index + 1].status
								: null;

						return (
							<React.Fragment key={`${flow.id}-${index}-step`}>
								<HoverCard openDelay={100}>
									<HoverCardTrigger className="z-30">
										<div
											className={`w-14 h-14 rounded-full flex items-center justify-center text-sm
                        ${
							index <= currentStepIndex
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
												{step.name}
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
								{index < flowTypeInfo.steps.length - 1 && (
									<div
										className={`absolute top-1/2 h-0.5 z-20 ${getStatusColor(
											nextStatus || ""
										)}`}
										style={{
											left: `calc(${
												(index /
													(flowTypeInfo.steps.length -
														1)) *
												100
											}% + 7px)`,
											width: `calc(${
												100 /
												(flowTypeInfo.steps.length - 1)
											}% - 14px)`,
										}}
									></div>
								)}
							</React.Fragment>
						);
					})}
				</div>
				<div className="flex justify-between items-end">
					<div>
						<p className="mt-4 text-sm text-muted-foreground">
							当前步骤:{" "}
							{flowTypeInfo.steps[currentStepIndex]?.name}
						</p>
						<p className="mt-2 text-xs text-muted-foreground">
							{flowTypeInfo.steps[currentStepIndex]
								?.description || "流程已结束"}
						</p>
					</div>
					<div className="space-x-3">
						{flow.isAccepted !== null ? (
							<Button
								disabled={loading}
								variant="secondary"
								onClick={handleReopen}
							>
								<LockOpen />
							</Button>
						) : (
							<>
								{
									// 如果当前步骤不是第一个步骤，显示后退按钮
									currentStepIndex > 0 && (
										<Button
											disabled={loading}
											variant="secondary"
											onClick={handleBackward}
										>
											<ArrowLeft />
										</Button>
									)
								}
								<Button
									disabled={loading}
									variant="destructive"
									onClick={handleReject}
								>
									<X />
								</Button>
								<Button
									disabled={loading}
									variant="secondary"
									onClick={
										isLastStep
											? handleLastStep
											: handleForward
									}
								>
									<ArrowRight />
								</Button>
							</>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
