'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { displayProblemType, selectProbType } from '@/types/problem';
import { Label } from '../ui/label';
import { Dispatch, SetStateAction } from 'react';
import { Button } from '../ui/button';
interface ProbCheckBoxProps {
  probList: displayProblemType[];
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
        {probList.map((prob, index) => (
          <div key={`probClass-${index}`} className="mb-2">
            <div className="grid grid-cols-3 gap-3">
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
                              name: prob.title,
                              maxPoint: prob.score,
                            },
                          ];
                        }
                        return prev.filter((item) => item.id !== prob.id);
                      });
                    }}
                  />
                  <Label>{prob.title}</Label>
                </div>
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
