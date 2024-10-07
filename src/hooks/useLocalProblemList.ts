'use client';

import { selectProbSchema, selectProbType } from '@/types/problem';
import { useState } from 'react';
import { useEffect } from 'react';

export const useLocalProblemList = () => {
  const [problemList, setProblemList] = useState<selectProbType['problemList']>(
    [],
  );
  useEffect(() => {
    const selectedProbs = localStorage.getItem('people_selectedProbs');
    if (!selectedProbs) {
      return;
    }
    const res = selectProbSchema.safeParse(JSON.parse(selectedProbs));
    if (res.success) {
      setProblemList(res.data.problemList);
    } else {
      localStorage.removeItem('people_selectedProbs');
    }
  }, []);
  return problemList;
};
