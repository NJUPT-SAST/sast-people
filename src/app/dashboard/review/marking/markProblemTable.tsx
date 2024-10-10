import { MarkProblemTable } from '@/components/review/markProblemTable';
import { useExamMapList } from '@/hooks/useExamMapList';
import { useOngoingFlowStep } from '@/hooks/useOngoingFlowStep';

export const MarkProblemTableServer = async ({ user }: { user: string }) => {
  const flowStepId = await useOngoingFlowStep(user);
  console.log('flowStepId', flowStepId);
  const points = await useExamMapList(flowStepId);
  console.log('points', points);
  return (
    <>
      <MarkProblemTable points={points} flowStepId={flowStepId} />
    </>
  );
};
