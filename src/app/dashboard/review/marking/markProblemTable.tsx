import { MarkProblemTable } from '@/components/review/markProblemTable';
import { useUserPointList } from '@/hooks/useUserPointList';
import { useOpenUserFlow } from '@/hooks/useOpenUserFlow';
import { useLocalSelectedProbs } from '@/hooks/useLocalSelectedProbs';

export const MarkProblemTableServer = async ({ user }: { user: string }) => {
  const userFlowId = await useOpenUserFlow(user);

  const selectedProbs = await useLocalSelectedProbs();
  const problems = selectedProbs?.problemList ?? [];
  const flowId = selectedProbs?.flowTypeId ?? -1;
  const points = await useUserPointList(flowId);
  return (
    <>
      <MarkProblemTable points={points} flowId={flowId} />
    </>
  );
};
