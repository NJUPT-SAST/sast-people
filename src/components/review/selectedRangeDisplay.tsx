'use client';
import { useEffect, useState } from 'react';
import { selectProbSchema, selectProbType } from '@/types/problem';
import { Badge } from '@/components/ui/badge';

export const SelectedRangeDisplay = () => {
  const [selectedRange, setSelectedRange] = useState<selectProbType | null>(null);

  const loadSelectedRange = () => {
    const selectedProbs = localStorage.getItem('people_selectedProbs');
    if (!selectedProbs) {
      setSelectedRange(null);
      return;
    }
    const res = selectProbSchema.safeParse(JSON.parse(selectedProbs));
    if (res.success) {
      setSelectedRange(res.data);
    } else {
      setSelectedRange(null);
    }
  };

  useEffect(() => {
    loadSelectedRange();

    // Listen for custom event when review range is updated
    const handleRangeUpdate = () => {
      loadSelectedRange();
    };

    window.addEventListener('reviewRangeUpdated', handleRangeUpdate);

    return () => {
      window.removeEventListener('reviewRangeUpdated', handleRangeUpdate);
    };
  }, []);

  if (!selectedRange || selectedRange.problemList.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        未设置阅卷范围
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">
        当前阅卷范围:
      </div>
      <div className="flex flex-wrap gap-2">
        {selectedRange.problemList.map((prob) => (
          <Badge key={prob.id} variant="secondary">
            {prob.name} ({prob.maxPoint}分)
          </Badge>
        ))}
      </div>
    </div>
  );
};
