import { EditProblems } from '@/components/flowTypes/operations/editProblems';
import { useFlowTypeInfo } from '@/hooks/useFlowTypeInfo';
import { useProblemList } from '@/hooks/useProblemList';
import { useStepWithProblem } from '@/hooks/useStepWithProblem';

export const EditProblemsServer = async ({ id }: { id: string }) => {
  const { stepList, stepWithProblemId } = await useStepWithProblem(Number(id));
  const problems = stepWithProblemId
    ? await useProblemList(stepWithProblemId)
    : {};
  return (
    <>
      <EditProblems
        problems={problems}
        stepList={stepList}
        currentStepId={stepWithProblemId ?? 0}
        flowTypeId={Number(id)}
      />
    </>
  );
};
