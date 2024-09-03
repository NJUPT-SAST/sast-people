"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { createInsertSchema } from "drizzle-zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { user } from "../../../../migrations/schema";
import { Button } from "../ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "../ui/card";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { editBasicInfo } from "@/app/action/user/userInfo";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

export const fullUserSchema = createInsertSchema(user, {
	email: z.string().email("请输入正确的邮箱地址").trim(),
	phoneNumber: z
		.string()
		.regex(
			/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
			"请输入正确的手机号码"
		)
		.trim(),
	birthday: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, "请输入以YYYY-MM-DD格式的生日")
		.trim(),
	name: z.string().min(2, "姓名至少两个字符").trim(),
	studentId: z
		.string()
		.regex(
			/^([BPQF](1[89]|2[0-5])(0[0-9]|1[0-7])([0-2]\d|3[01])\d{2}|\d{11})$/i,
			"请输入正确的学号"
		)
		.trim(),
});
export const basicInfoSchema = fullUserSchema.pick({
	name: true,
	studentId: true,
	phoneNumber: true,
	email: true,
	birthday: true,
	college: true,
	major: true,
});
export const BasicInfo = () => {
	const basicInfoForm = useForm<z.infer<typeof basicInfoSchema>>({
		resolver: zodResolver(basicInfoSchema),
		defaultValues: {},
	});
	return (
		<Card>
			<CardHeader>
				<CardTitle>基本信息</CardTitle>
				<CardDescription>个人基本信息</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...basicInfoForm}>
					<div className="space-y-2">
						<FormField
							control={basicInfoForm.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>姓名</FormLabel>
									<FormControl>
										<Input
											placeholder="请填写你的真实姓名"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={basicInfoForm.control}
							name="studentId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>学号</FormLabel>
									<FormControl>
										<Input
											placeholder="请填写你的学号"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={basicInfoForm.control}
							name="phoneNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>手机号码</FormLabel>
									<FormControl>
										<Input
											placeholder="请填写你的手机号"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={basicInfoForm.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>邮箱</FormLabel>
									<FormControl>
										<Input
											placeholder="请填写你的邮箱地址"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={basicInfoForm.control}
							name="birthday"
							render={({ field }) => (
								<FormItem>
									<FormLabel>生日</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="请使用 YYYY-MM-DD 的格式输入你的生日"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={basicInfoForm.control}
							name="college"
							render={({ field }) => (
								<FormItem>
									<FormLabel>学院</FormLabel>
									<Select
										value={field.value}
										name={field.name}
										onValueChange={field.onChange}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="请选择你目前所在的学院" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="0">
												自动化学院、人工智能学院
											</SelectItem>
											<SelectItem value="1">
												计算机
											</SelectItem>
											<SelectItem value="2">
												通信
											</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={basicInfoForm.control}
							name="major"
							render={({ field }) => (
								<FormItem>
									<FormLabel>专业</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="请填写你目前所在的专业"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</Form>
			</CardContent>
			<CardFooter>
				<Button onClick={basicInfoForm.handleSubmit(editBasicInfo)}>
					保存
				</Button>
			</CardFooter>
		</Card>
	);
};
