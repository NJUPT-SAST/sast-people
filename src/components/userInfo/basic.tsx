"use client";
import { editBasicInfo } from "@/action/user/userInfo";
import { user } from "@/db/schema";
import type { userType } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { createInsertSchema } from "drizzle-zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useCollegeList } from "@/hooks/useCollegeList";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "../ui/select";

export const fullUserSchema = createInsertSchema(user, {
  name: z.string().min(2, "姓名至少两个字符").trim(),
  studentId: z.string().min(1, "学号不能为空").trim().toUpperCase(),
  email: z.string().email("请输入正确的邮箱地址").trim().toLowerCase(),
  phone: z
    .string()
    .regex(
      /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      "请输入正确的手机号码"
    ),
  college: z.string().min(1, "学院不能为空").trim(),
  major: z.string().min(1, "专业不能为空").trim(),
});
export const basicInfoSchema = fullUserSchema.pick({
  name: true,
  studentId: true,
  phone: true,
  email: true,
  college: true,
  major: true,
});
export const BasicInfo = ({ initialInfo }: { initialInfo: userType }) => {
  const collegeList = useCollegeList();
  const basicInfoForm = useForm<z.infer<typeof basicInfoSchema>>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      ...Object.fromEntries(
        Object.entries(initialInfo).map(([key, value]) => [key, value ?? ""])
      ),
    },
  });
  const { isSubmitting, errors } = basicInfoForm.formState;
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
              disabled={isSubmitting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>姓名</FormLabel>
                  <FormControl>
                    <Input placeholder="请填写你的真实姓名" {...field} />
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
                      disabled
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
            <FormField
              control={basicInfoForm.control}
              disabled={isSubmitting}
              name="college"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>学院</FormLabel>
                  <FormControl>
                    <Select value={field.value || ""} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="请选择你的学院" />
                      </SelectTrigger>
                      <SelectContent>
                        {collegeList.map((college) => (
                          <SelectItem key={college} value={college}>
                            {college}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
      </CardContent>
      <CardFooter>
        <Button
          onClick={basicInfoForm.handleSubmit(async () => {
            const val = basicInfoForm.getValues();
            toast.promise(editBasicInfo(val), {
              loading: "正在保存",
              success: "个人信息保存成功",
              error: "个人信息保存失败",
            });
          })}
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          保存
        </Button>
      </CardFooter>
    </Card>
  );
};
