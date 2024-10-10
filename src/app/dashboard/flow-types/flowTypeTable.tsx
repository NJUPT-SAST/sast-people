import { FlowTypeTable, FlowTypeTableColumns } from "@/components/flowTypes/table";
import { useFlowTypeList } from "@/hooks/useFlowTypeList";

export const FlowTypeTableServer = async () => {
  const data = await useFlowTypeList();
  return <FlowTypeTable columns={FlowTypeTableColumns} data={data} />;
};
