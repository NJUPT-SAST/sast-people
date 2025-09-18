import SelectProblem from '@/components/review/selectProblem';
import { useFlowList } from '@/hooks/useFlowList';

export const SelectProblemServer = async () => {
  const flow = await useFlowList();
  return <SelectProblem flowList={flow} />;
};
