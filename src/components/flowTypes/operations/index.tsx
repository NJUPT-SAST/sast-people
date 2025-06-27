import { Button } from '../../ui/button';
import { flowTypeType } from '@/types/flowType';
import { EditSteps } from './editSteps';
import { Delete } from './delete';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// export const Operations = ({ data }: { data: flowTypeType }) => {
export const Operations = () => {
  const stepsCount = 0;
  return (
    <>
      {/* <EditSteps data={data} /> */}
      {stepsCount > 0 ? (
        // <Link href={`/dashboard/flow-types/edit-exam?id=${data.id}`}>
        <Link href={`/dashboard/flow-types/edit-exam`}>
          <Button variant={'ghost'}>编辑笔试</Button>
        </Link>
      ) : (
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger>
              <Button variant={'ghost'} disabled>
                编辑笔试
              </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-black text-white">
              <p>请先添加流程后编辑笔试</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {/* <Delete data={data} /> */}
    </>
  );
};
