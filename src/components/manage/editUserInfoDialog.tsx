"use client";
import { editBasicInfoByUid } from "@/action/user/userInfo";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { userType } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserCog } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { basicInfoSchema } from "../userInfo/basic";
import { Description } from "@radix-ui/react-dialog";

export const EditUserInfoDialog = ({
	userInfo,
	colleges
}: {
	userInfo: Partial<userType>;
	colleges: { id: number; name: string }[];
}) => {
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
								name="phone"
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
							{/* <FormField
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
							/> */}
							<FormField
								control={basicInfoForm.control}
								disabled={isSubmitting}
								name="college"
								render={({ field }) => (
									<FormItem>
										<FormLabel>学院</FormLabel>
										<FormControl>
											<Input
												placeholder="请填写你的学院"
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
							console.log("Form data:", val);
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
