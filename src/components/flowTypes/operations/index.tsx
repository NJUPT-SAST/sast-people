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

export const Operations = ({ data }: { data: flowTypeType }) => {
  const stepsCount = data.steps.length;
  return (
    <>
      <EditSteps data={data} />
      {stepsCount > 0 ? (
        <Link href={`/dashboard/flow-types/edit-exam?id=${data.id}`}>
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
      <Delete data={data} />
    </>
  );
};
