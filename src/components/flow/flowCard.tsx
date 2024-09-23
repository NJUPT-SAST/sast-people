import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { displayFlowType } from '@/types/flow';
import { Badge } from '../ui/badge';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../ui/hover-card';
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  CircleDashed,
} from 'lucide-react';
import { useFlowStepsInfo } from '@/hooks/useFlowStepsInfo';

// 定义状态图标映射
const statusIcons = {
  pending: CircleDashed,
  ongoing: Clock,
  accepted: CheckCircle,
  rejected: XCircle,
};

const statusName = {
  pending: '未开始',
  ongoing: '进行中',
  accepted: '已通过',
  rejected: '未通过',
};

interface FlowCardProps {
  flow: displayFlowType;
}

export const FlowCard: React.FC<FlowCardProps> = async ({ flow }) => {
  const { flowTypeInfo } = flow;
  const rawFlowSteps = await useFlowStepsInfo(flow.id);
  const flowSteps = flowTypeInfo.steps.map((step) => {
    const rawFlowStep = rawFlowSteps.find(
      (rawFlowStep) => rawFlowStep.stepId === step.id,
    );
    return {
      ...step,
      status: rawFlowStep?.status,
    };
  });
  const currentStepIndex =
    flowSteps.findIndex((step) => step.status === 'pending') - 1;

  // 确定流程的整体状态
  const overallStatus = flow.isAccepted
    ? 'accepted'
    : currentStepIndex === flowSteps.length - 1 &&
        flowSteps[currentStepIndex].status === 'rejected'
      ? 'rejected'
      : 'ongoing';

  // 根据状态确定颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-primary';
      case 'rejected':
        return 'bg-destructive';
      case 'ongoing':
        return 'bg-blue-500';
      default:
        return 'bg-muted';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {flowTypeInfo.name}
        </CardTitle>
        <Badge variant={flow.isAccepted ? 'default' : 'secondary'}>
          {flow.isAccepted ? '已通过考核' : '流程进行中'}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between relative my-5">
          {/* 背景横线 */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted z-10"></div>
          {flowTypeInfo.steps.map((step, index) => {
            const status = flowSteps[index].status;
            const Icon =
              statusIcons[status as keyof typeof statusIcons] || AlertCircle;
            const nextStatus =
              index < flowTypeInfo.steps.length - 1
                ? flowSteps[index + 1].status
                : null;

            return (
              <React.Fragment key={`${flow.id}-${index}-step`}>
                <HoverCard openDelay={100}>
                  <HoverCardTrigger className="z-30">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center text-sm
                        ${index <= currentStepIndex ? getStatusColor(status || '') + ' text-white' : 'bg-muted text-muted-foreground'}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">{step.name}</h4>
                      <p className="text-sm">{step.description}</p>
                      <p className="text-xs text-muted-foreground">
                        状态: {statusName[status as keyof typeof statusName]}
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
                {index < flowTypeInfo.steps.length - 1 && (
                  <div
                    className={`absolute top-1/2 h-0.5 z-20 ${getStatusColor(nextStatus || '')}`}
                    style={{
                      left: `calc(${(index / (flowTypeInfo.steps.length - 1)) * 100}% + 7px)`,
                      width: `calc(${100 / (flowTypeInfo.steps.length - 1)}% - 14px)`,
                    }}
                  ></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          当前步骤: {flowTypeInfo.steps[currentStepIndex]?.name}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          {flowTypeInfo.steps[currentStepIndex]?.description || '流程已结束'}
        </p>
      </CardContent>
    </Card>
  );
};
