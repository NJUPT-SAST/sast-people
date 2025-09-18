import { EditProblems } from '@/components/flow/operations/editProblems';
import { useStepWithProblem } from '@/hooks/useStepWithProblem';
import { useProblemList } from '@/hooks/useProblemList';

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
