import { EditProblems } from '@/components/flowTypes/operations/editProblems';
import { PageTitle } from '@/components/route';
import { Button } from '@/components/ui/button';
import { useFlowTypeInfo } from '@/hooks/useFlowTypeInfo';
import { useProblemList } from '@/hooks/useProblemList';
import { useStepWithProblem } from '@/hooks/useStepWithProblem';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default async function EditExamPage({
  searchParams,
}: { searchParams: { id: string } }) {
  const { id } = searchParams;
  const [flowTypeInfo, { stepList, stepWithProblemId }] = await Promise.all([
    useFlowTypeInfo(Number(id)),
    useStepWithProblem(Number(id)),
  ]);
  const problems = stepWithProblemId
    ? await useProblemList(stepWithProblemId)
    : {};
  return (
    <>
      <div className="flex items-center justify-between">
        <Link href="/dashboard/flow-types">
          <Button variant="ghost">
            <h1 className="text-lg font-semibold md:text-2xl inline-flex items-center gap-2">
              <ArrowLeftIcon className="w-5 h-5" /> 编辑考试
            </h1>
          </Button>
        </Link>
        <p className="text-sm text-muted-foreground">{flowTypeInfo.name}</p>
      </div>
      <div>
        <EditProblems
          problems={problems}
          stepList={stepList}
          currentStepId={stepWithProblemId ?? 0}
          flowTypeId={Number(id)}
        />
      </div>
    </>
  );
}
