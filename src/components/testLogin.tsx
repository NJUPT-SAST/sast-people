'use client';
import { Separator } from './ui/separator';
import { ArrowRight } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useFormStatus } from 'react-dom';
import { loginFromTest } from '@/action/user/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const TestLogin = async () => {
  const formStatus = useFormStatus();
  const router = useRouter();
  return (
    <div className="w-1/2 flex flex-col items-center">
      <Separator className="w-full mb-6" />
      <p className="text-xl font-semibold">使用测试帐号登入</p>
      <form
        action={async (formdata) => {
          toast.promise(
            async () => {
              await loginFromTest(formdata);
              router.push('/dashboard');
              return;
            },
            {
              loading: '登录中',
              success: '登录成功',
              error: '登录失败, 请检查该学号是否已经拥有帐号',
            },
          );
        }}
        className="w-3/4 mt-5 flex items-center justify-center gap-3"
      >
        <Input
          disabled={formStatus.pending}
          type="text"
          name="studentId"
          placeholder="请填写已注册的学号"
        />
        <FormContentWithStatus />
      </form>
    </div>
  );
};

const FormContentWithStatus = async () => {
  const formStatus = useFormStatus();
  return (
    <>
      <Button
        loading={formStatus.pending}
        disabled={formStatus.pending}
        type="submit"
        className="m-0"
      >
        登录 <ArrowRight />
      </Button>
    </>
  );
};
