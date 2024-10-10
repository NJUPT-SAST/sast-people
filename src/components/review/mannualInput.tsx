'use client';
import Link from 'next/link';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const MannualInput = () => {
  const [studentId, setStudentId] = useState('');
  const router = useRouter();
  return (
    <>
      <div className="flex items-center gap-3">
        <Input
          placeholder="请输入考生学号"
          onChange={(e) => setStudentId(e.target.value)}
        />
        <div className="flex-none">
          <Button
            disabled={!studentId}
            onClick={() =>
              router.push(`/dashboard/review/marking?user=${studentId}`)
            }
            size="sm"
          >
            开始阅卷
          </Button>
        </div>
      </div>
    </>
  );
};
