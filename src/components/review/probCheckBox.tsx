'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { FormField, FormItem } from '../ui/form';
import { Form } from '../ui/form';
import { useForm } from 'react-hook-form';
import { problemType, selectProbType } from '@/types/problem';
import { Label } from '../ui/label';
import { Dispatch, SetStateAction, useState } from 'react';
import { Button } from '../ui/button';
interface ProbCheckBoxProps {
  probList: problemType;
  selectedProbs: selectProbType['problemList'];
  setSelectedProbs: Dispatch<SetStateAction<selectProbType['problemList']>>;
  handleSave: () => void;
}

const ProbCheckBox: React.FC<ProbCheckBoxProps> = ({
  probList,
  selectedProbs,
  setSelectedProbs,
  handleSave,
}) => {
  if (!probList) {
    return null;
  }
  return (
    <>
      <div className="mt-5 flex-column">
        {Object.entries(probList).map(([key, value], index) => (
          <div key={`probClass-${index}`}>
            <p className="text-sm font-semibold mb-2">{key}</p>
            <div className="grid grid-cols-3 gap-3">
              {value.map((prob) => (
                <div
                  className="flex items-center gap-2"
                  key={`prob-${prob.id}`}
                >
                  <Checkbox
                    key={prob.id}
                    name={prob.id.toString()}
                    defaultChecked={selectedProbs.some(
                      (item) => item.id === prob.id,
                    )}
                    onCheckedChange={(check) => {
                      setSelectedProbs((prev) => {
                        if (check) {
                          return [
                            ...prev,
                            {
                              id: prob.id,
                              name: prob.name,
                              maxPoint: prob.maxScore,
                            },
                          ];
                        }
                        return prev.filter((item) => item.id !== prob.id);
                      });
                    }}
                  />
                  <Label>{prob.name}</Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <Button onClick={handleSave}>提交</Button>
      </div>
    </>
  );
};
export default ProbCheckBox;
