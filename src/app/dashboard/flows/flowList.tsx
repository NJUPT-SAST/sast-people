import { FlowCard } from '@/components/flow/flowCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useMyFlowList } from '@/hooks/useMyFlowList';
import { Suspense } from 'react';

export const FlowList = async () => {
  const myFlowList = await useMyFlowList();
  return (
    <>
      {myFlowList.map((flow) => (
        <Suspense
          fallback={
            <Card className="h-[220px]">
              <CardHeader>
                <CardTitle hidden>Loading</CardTitle>
                <Skeleton className="w-[100px] h-[20px]" />
              </CardHeader>
              <CardContent>
                <Skeleton className="w-full h-[76px]" />
                <Skeleton className="w-full h-[40px] mt-3" />
              </CardContent>
            </Card>
          }
          key={flow.id}
        >
          <FlowCard key={flow.id} flow={flow} />
        </Suspense>
      ))}
    </>
  );
};
