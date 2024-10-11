'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { createInsertSchema } from 'drizzle-zod';
import { useForm } from 'react-hook-form';
import { number, z } from 'zod';
import { user } from '../../../migrations/schema';
import { Button } from '../ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { editBasicInfo } from '@/action/user/userInfo';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import type { userType } from '@/types/user';
import { collegeType } from '@/types/college';
import { toast } from 'sonner';
import originalDayjs from '@/lib/dayjs';

export const fullUserSchema = createInsertSchema(user, {
  email: z.string().email('请输入正确的邮箱地址').trim().toLowerCase(),
  phoneNumber: z
    .string()
    .regex(
      /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      '请输入正确的手机号码',
    )
    .trim(),
  birthday: z
    .string()
    .refine(
      (val) => {
        const parsedDate = originalDayjs(val, 'YYYY-MM-DD', true);
        return parsedDate.isValid();
      },
      {
        message: '请输入有效的日期格式 (YYYY-MM-DD)',
      },
    )
    .refine(
      (val) => {
        const parsedDate = originalDayjs(val, 'YYYY-MM-DD');
        return (
          parsedDate.isAfter('1900-01-01') &&
          parsedDate.isBefore(originalDayjs())
        );
      },
      {
        message: '请输入 1900 年至今的日期',
      },
    ),
  name: z.string().min(2, '姓名至少两个字符').trim(),
  studentId: z
    .string()
    .regex(
      /^([BPQF](1[89]|2[0-5])(0[0-9]|1[0-7])([0-2]\d|3[01])\d{2}|\d{11})$/i,
      '请输入正确的学号',
    )
    .trim(),
  college: z
    .number({
      invalid_type_error: '请选择你所在的学院',
    })
    .transform((val) => val.toString()),
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
export const BasicInfo = ({
  initialInfo,
  collegeList,
}: {
  initialInfo: userType;
  collegeList: collegeType[];
}) => {
  const basicInfoForm = useForm<z.infer<typeof basicInfoSchema>>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      ...Object.fromEntries(
        Object.entries(initialInfo).map(([key, value]) => [key, value ?? '']),
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
                      value={field.value || ''}
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
                      value={field.value || ''}
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
                      value={field.value || ''}
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
                      value={field.value || ''}
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
                      {collegeList.map((college) => (
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
                      value={field.value || ''}
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
          onClick={basicInfoForm.handleSubmit(async (val) => {
            await editBasicInfo(val);
            toast.success('个人信息保存成功');
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
