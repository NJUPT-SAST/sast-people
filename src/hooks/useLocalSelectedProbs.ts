'use client';

import { selectProbSchema, selectProbType } from '@/types/problem';
import { useState } from 'react';
import { useEffect } from 'react';

export const useLocalSelectedProbs = () => {
  const [selectedProbs, setSelectedProbs] = useState<selectProbType>();
  useEffect(() => {
    const selectedProbs = localStorage.getItem('people_selectedProbs');
    if (!selectedProbs) {
      return;
    }
    const res = selectProbSchema.safeParse(JSON.parse(selectedProbs));
    if (res.success) {
      setSelectedProbs(res.data);
    } else {
      localStorage.removeItem('people_selectedProbs');
    }
  }, []);
  return selectedProbs;
};
