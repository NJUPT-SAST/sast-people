'use client';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const MannualInput = () => {
  const [studentId, setStudentId] = useState('');
  const [, setHasReviewRange] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkReviewRange = () => {
      const selectedProbs = localStorage.getItem('people_selectedProbs');
      const hasRange = !!selectedProbs;
      setHasReviewRange(hasRange);
      console.log('Review range check:', hasRange, selectedProbs);
    };

    checkReviewRange();

    const handleUpdate = () => {
      checkReviewRange();
    };

    window.addEventListener('reviewRangeUpdated', handleUpdate);

    return () => {
      window.removeEventListener('reviewRangeUpdated', handleUpdate);
    };
  }, []);

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
