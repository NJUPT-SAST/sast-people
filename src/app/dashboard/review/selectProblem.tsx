import SelectProblem from '@/components/review/selectProblem';
import useFlowType from '@/hooks/useFlowType';

export const SelectProblemServer = async () => {
  const flow = await useFlowType();
  return <SelectProblem flowTypes={flow} />;
};
