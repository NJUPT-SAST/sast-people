"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField, FormItem } from "../ui/form";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { problemType } from "@/types/problem";
import { Label } from "../ui/label";
import { Dispatch, SetStateAction, useState } from "react";
interface ProbCheckBoxProps {
  probList: problemType;
  selectedProbs: string[];
  setSelectedProbs: Dispatch<SetStateAction<string[]>>;
}

const ProbCheckBox: React.FC<ProbCheckBoxProps> = ({
  probList,
  selectedProbs,
  setSelectedProbs,
}) => {
  if (!probList) {
    return null;
  }
  return (
    <div className="mt-5 flex-column">
      {Object.entries(probList).map(([key, value]) => (
        <>
          <p className="text-sm font-semibold mb-2">{key}</p>
          <div className="grid grid-cols-3 gap-3">
            {value.map((prob) => (
              <div className="flex items-center gap-2">
                <Checkbox
                  key={prob.id}
                  name={prob.id.toString()}
                  onCheckedChange={(check) => {
                    if (check) {
                      setSelectedProbs([...selectedProbs, prob.id.toString()]);
                    } else {
                      setSelectedProbs(
                        selectedProbs.filter(
                          (item) => item !== prob.id.toString()
                        )
                      );
                    }
                  }}
                />
                <Label>{prob.name}</Label>
              </div>
            ))}
          </div>
        </>
      ))}
    </div>
  );
};
export default ProbCheckBox;
