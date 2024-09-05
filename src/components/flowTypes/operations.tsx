"use Client";
import React from "react";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { deleteFlowType } from "@/action/flow-type/delete";
import { toast } from "sonner";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import { flowTypeType } from "@/types/flowType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addFlowTypeSchema } from "./add";
import { Input } from "../ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { updateFlowType } from "@/action/flow-type/update";

export const Operations = ({ data }: { data: flowTypeType }) => {
	const editFlowForm = useForm<z.infer<typeof addFlowTypeSchema>>({
		resolver: zodResolver(addFlowTypeSchema),
		defaultValues: {
			name: data.name,
			description: data.description,
		},
	});
	const { isSubmitting } = editFlowForm.formState;
	const [openEdit, setOpenEdit] = React.useState(false);
	const [openDelete, setOpenDelete] = React.useState(false);
	return (
		<>
			<Sheet open={openEdit} onOpenChange={setOpenEdit}>
				<SheetTrigger asChild>
					<Button size={"sm"} variant={"ghost"}>
						编辑
					</Button>
				</SheetTrigger>
				<SheetContent className="w-full md:w-3/4">
					<SheetHeader>
						<SheetTitle>流程编辑</SheetTitle>
						<SheetDescription>
							在下方编辑流程的基本信息与流程的步骤
						</SheetDescription>
					</SheetHeader>
					<div className="grid gap-4 py-4">
						<Form {...editFlowForm}>
							<FormField
								control={editFlowForm.control}
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
								control={editFlowForm.control}
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
					<SheetFooter>
						<Button
							type="submit"
							loading={isSubmitting}
							disabled={isSubmitting}
							onClick={editFlowForm.handleSubmit(async (val) => {
								toast.promise(
									async () => {
										await updateFlowType(data.id, val).then(
											() => {
												setOpenEdit(false);
												editFlowForm.reset();
											}
										);
									},
									{
										loading: "正在编辑",
										success: `${val.name} 已修改成功`,
										error: "修改的时候出现了问题，请稍后重试",
									}
								);
							})}
						>
							确认添加
						</Button>
					</SheetFooter>
				</SheetContent>
			</Sheet>
			<Dialog open={openDelete} onOpenChange={setOpenDelete}>
				<DialogTrigger asChild>
					<Button
						size="sm"
						variant="ghost"
						className="text-destructive"
					>
						删除
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>确定要删除吗？</DialogTitle>
						<DialogDescription>
							删除操作无法撤回，请确保你要这样做。
						</DialogDescription>
						<DialogFooter className="gap-2 mt-3">
							<DialogClose asChild>
								<Button variant="outline">取消</Button>
							</DialogClose>
							<Button
								variant="destructive"
								onClick={async () => {
									setOpenDelete(false);
									toast.promise(deleteFlowType(data.id), {
										loading: "删除中...",
										success: "删除成功",
										error: "删除失败",
									});
								}}
							>
								删除
							</Button>
						</DialogFooter>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</>
	);
};
