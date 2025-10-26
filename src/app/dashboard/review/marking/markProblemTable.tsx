'use client';
import { MarkProblemTable } from "@/components/review/markProblemTable";
import { useUserPointList } from "@/hooks/useUserPointList";
import { useLocalFlowId } from "@/hooks/useLocalFlowId";
import { useState, useEffect } from "react";
import { userPoint } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { useUserFlowId } from "@/hooks/useUserFlow";

export const MarkProblemTableServer = ({ user }: { user: string }) => {
  const flowId = useLocalFlowId();
  const { data: userFlowData, error: userFlowError, isLoading: userFlowLoading } = useUserFlowId(user, flowId ?? 0);
  const [points, setPoints] = useState<Array<InferSelectModel<typeof userPoint>>>([]);
  const [loading, setLoading] = useState(true);

  const userFlowId = userFlowData?.userFlowId ?? 0;

  useEffect(() => {
    const fetchPoints = async () => {
      if (userFlowId && userFlowId > 0) {
        setLoading(true);
        const data = await useUserPointList(userFlowId);
        setPoints(data);
        setLoading(false);
      }
    };
    fetchPoints();
  }, [userFlowId]);

  console.log('Rendered MarkProblemTableServer with flowId:', userFlowId, 'and points:', points);

  if (flowId === null || userFlowLoading || loading || !userFlowId) {
    return null;
  }

  if (userFlowError) {
    return <div>Error loading user flow</div>;
  }

  return (
    <>
      <MarkProblemTable points={points} userFlowId={userFlowId} />
    </>
  );
};