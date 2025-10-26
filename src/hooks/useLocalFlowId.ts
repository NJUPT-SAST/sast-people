'use client';

import { selectProbSchema } from '@/types/problem';
import { useState, useEffect } from 'react';

export const useLocalFlowId = () => {
  const [flowId, setFlowId] = useState<number | null>(null);

  useEffect(() => {
    const selectedProbs = localStorage.getItem('people_selectedProbs');
    if (!selectedProbs) {
      return;
    }
    const res = selectProbSchema.safeParse(JSON.parse(selectedProbs));
    if (res.success && res.data?.flowTypeId) {
      setFlowId(res.data.flowTypeId as number);
    } else {
      localStorage.removeItem('people_selectedProbs');
    }
  }, []);

  return flowId;
};
