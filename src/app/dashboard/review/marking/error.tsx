'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft, ShieldQuestion } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-full flex justify-center items-center flex-col gap-3">
      <ShieldQuestion className='w-[100px] h-[100px]' strokeWidth="1px" />
      <h2>获取不到题目列表，同学是否报名了流程？</h2>
      <Button onClick={() => router.back()}><ArrowLeft />回到上一页</Button>
    </div>
  );
}
