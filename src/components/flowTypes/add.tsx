"use client";
import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { createInsertSchema } from "drizzle-zod";
import { flowType } from "@/db/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { basicInfoSchema } from "../userInfo/basic";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { addFlowType } from "@/action/flow-type/add";
import { toast } from "sonner";

export const fullFlowTypeSchema = createInsertSchema(flowType, {
	name: z.string().min(1, "请输入流程名称").trim(),
	description: z.string().min(1, "请输入流程描述").trim(),
});

export const addFlowTypeSchema = fullFlowTypeSchema.pick({
	name: true,
	description: true,
});

export const AddFlowType = () => {
	const addFlowForm = useForm<z.infer<typeof addFlowTypeSchema>>({
		resolver: zodResolver(addFlowTypeSchema),
	});
	const { isSubmitting, errors } = addFlowForm.formState;
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size="sm">添加流程</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>添加流程</DialogTitle>
					<DialogDescription>
						添加新的流程类型，比如“2023 校科协软研招新笔试”
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<Form {...addFlowForm}>
						<FormField
							control={addFlowForm.control}
							name="name"
							disabled={isSubmitting}
							render={({ field }) => (
								<FormItem>
									<FormLabel>流程名称</FormLabel>
									<FormControl>
										<Input
											placeholder="填写展示的流程名称"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={addFlowForm.control}
							name="description"
							disabled={isSubmitting}
							render={({ field }) => (
								<FormItem>
									<FormLabel>流程描述</FormLabel>
									<FormControl>
										<Textarea
											placeholder="填写展示的流程描述"
											{...field}
											value={field.value || ""}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</Form>
				</div>
				<DialogFooter>
					<Button
						type="submit"
						loading={isSubmitting}
						disabled={isSubmitting}
						onClick={addFlowForm.handleSubmit(async (val) => {
							toast.promise(
								async () => {
									await addFlowType(val).then(() => {
										setOpen(false);
									});
								},
								{
									loading: "正在添加",
									success: `${val.name} 已添加成功`,
									error: "添加的时候出现了问题，稍后重试",
									position: "top-center",
								}
							);
						})}
					>
						确认添加
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
