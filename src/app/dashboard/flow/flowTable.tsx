import { FlowTable, FlowTableColumns } from '@/components/flow/table';
import { useFlowList } from '@/hooks/useFlowList';

export const FlowTableServer = async () => {
  const data = await useFlowList();
  return <FlowTable columns={FlowTableColumns} data={data} />;
};
