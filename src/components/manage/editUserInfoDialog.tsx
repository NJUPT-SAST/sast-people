"use client";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { UserCog } from "lucide-react";
import { userType } from "@/types/user";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "../ui/select";
import { z } from "zod";
import { Input } from "../ui/input";
import { basicInfoSchema } from "../userInfo/basic";
import { useCollegeListClient } from "@/hooks/useCollegeListClient";
import { Button } from "../ui/button";
import { editBasicInfoByUid } from "@/action/user/userInfo";
import { toast } from "sonner";

export const EditUserInfoDialog = ({
	userInfo,
}: {
	userInfo: Partial<userType>;
}) => {
	const colleges = useCollegeListClient();
	const basicInfoForm = useForm<z.infer<typeof basicInfoSchema>>({
		resolver: zodResolver(basicInfoSchema),
		defaultValues: {
			...Object.fromEntries(
				Object.entries(userInfo).map(([key, value]) => [
					key,
					value ?? "",
				])
			),
		},
	});
	const { isSubmitting, errors } = basicInfoForm.formState;
	return (
		<Dialog>
			<DialogTrigger>
				<UserCog className="mr-2 h-4 w-4" />
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>编辑用户信息</DialogTitle>
					<Form {...basicInfoForm}>
						<div className="space-y-2">
							<FormField
								control={basicInfoForm.control}
								name="name"
								disabled={isSubmitting}
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
								disabled={isSubmitting}
								render={({ field }) => (
									<FormItem>
										<FormLabel>学号</FormLabel>
										<FormControl>
											<Input
												placeholder="请填写你的学号"
												{...field}
												value={field.value || ""}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={basicInfoForm.control}
								name="phoneNumber"
								disabled={isSubmitting}
								render={({ field }) => (
									<FormItem>
										<FormLabel>手机号码</FormLabel>
										<FormControl>
											<Input
												placeholder="请填写你的手机号"
												{...field}
												value={field.value || ""}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={basicInfoForm.control}
								disabled={isSubmitting}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>邮箱</FormLabel>
										<FormControl>
											<Input
												placeholder="请填写你的邮箱地址"
												{...field}
												value={field.value || ""}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={basicInfoForm.control}
								disabled={isSubmitting}
								name="birthday"
								render={({ field }) => (
									<FormItem>
										<FormLabel>生日</FormLabel>
										<FormControl>
											<Input
												{...field}
												value={field.value || ""}
												placeholder="请使用 YYYY-MM-DD 的格式输入你的生日"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={basicInfoForm.control}
								disabled={isSubmitting}
								name="college"
								render={({ field }) => (
									<FormItem>
										<FormLabel>学院</FormLabel>
										<Select
											value={field.value?.toString()}
											name={field.name}
											onValueChange={(val) => {
												field.onChange(parseInt(val));
											}}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="请选择你目前所在的学院" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{colleges.length &&
													colleges.map((college) => (
														<SelectItem
															key={`college${college.id}`}
															value={college.id.toString()}
														>
															{college.name}
														</SelectItem>
													))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={basicInfoForm.control}
								disabled={isSubmitting}
								name="major"
								render={({ field }) => (
									<FormItem>
										<FormLabel>专业</FormLabel>
										<FormControl>
											<Input
												{...field}
												placeholder="请填写你目前所在的专业"
												value={field.value || ""}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</Form>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">取消</Button>
					</DialogClose>
					<Button
						onClick={basicInfoForm.handleSubmit(async (val) => {
							await editBasicInfoByUid(
								userInfo.id as number,
								val
							);
							toast.success(`${userInfo.name} 的信息保存成功`);
						})}
						loading={isSubmitting}
						disabled={isSubmitting}
					>
						保存
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
