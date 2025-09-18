import { MarkProblemTable } from '@/components/review/markProblemTable';
import { useUserPointList } from '@/hooks/useUserPointList';
import { useOngoingUserFlow } from '@/hooks/useOngoingUserFlow';

export const MarkProblemTableServer = async ({ user }: { user: string }) => {
  const flowId = await useOngoingUserFlow(user);
  const points = await useUserPointList(flowId);
  return (
    <>
      <MarkProblemTable points={points} flowId={flowId} />
    </>
  );
};
