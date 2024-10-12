'use server';
import React, { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useExamMapList } from '@/hooks/useExamMapList';
import { MarkProblemTable } from '@/components/review/markProblemTable';
import { ArrowLeftIcon } from 'lucide-react';
import { useOngoingFlowStep } from '@/hooks/useOngoingFlowStep';
import { MarkProblemTableServer } from './markProblemTable';
import { Loading } from '@/components/loading';

const Marking = async ({
  searchParams,
}: {
  searchParams: {
    user: string;
  };
}) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Link href="/dashboard/review">
          <Button variant="ghost">
            <h1 className="text-lg font-semibold md:text-2xl inline-flex items-center gap-2">
              <ArrowLeftIcon className="w-5 h-5" /> 准备阅卷
            </h1>
          </Button>
        </Link>
      </div>
      {/* map problems to a list of points */}
      <div>
          <Suspense fallback={<Loading />}>
            <MarkProblemTableServer user={searchParams.user} />
          </Suspense>
      </div>
    </>
  );
};

export default Marking;
