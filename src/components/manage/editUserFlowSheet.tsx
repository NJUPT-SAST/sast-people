import React, { useCallback, useState } from "react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import { Workflow } from "lucide-react";
import { userType } from "@/types/user";
import { FlowCard } from "./flowCardClient";
import { useFlowListClient } from "@/hooks/useFlowListClient";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { displayFlowType } from "@/types/flow";

export const EditUserFlowSheet = ({
	userInfo,
}: {
	userInfo: Partial<userType>;
}) => {
	const { data: flowList } = useFlowListClient(userInfo.id as number);
	const [selectedFlow, setSelectedFlow] = useState<number>();

	return (
		<Sheet>
			<SheetTrigger>
				<Workflow className="mr-2 h-4 w-4" />
			</SheetTrigger>
			<SheetContent className="md:max-w-[50vw] space-y-5">
				<SheetHeader>
					<SheetTitle>
						编辑{" "}
						<span className="text-primary">{userInfo.name}</span>{" "}
						的流程
					</SheetTitle>
					<SheetDescription>在下方编辑用户的流程</SheetDescription>
				</SheetHeader>
				<Select
					onValueChange={(value) => {
						setSelectedFlow(parseInt(value));
					}}
				>
					<SelectTrigger>
						{selectedFlow !== undefined
							? `${
									flowList ? flowList[selectedFlow]?.flowTypeInfo.name : ""
							  }`
							: "选择流程"}
					</SelectTrigger>
					<SelectContent>
						{flowList &&
							flowList.map((flow, index) => (
								<SelectItem
									key={flow.id}
									value={index.toString()}
								>
									{flow.flowTypeInfo.name}
								</SelectItem>
							))}
					</SelectContent>
				</Select>
				{selectedFlow !== undefined && flowList && (
					<FlowCard flow={flowList[selectedFlow]} />
				)}
			</SheetContent>
		</Sheet>
	);
};
