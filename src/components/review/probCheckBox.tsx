import { Checkbox } from "@/components/ui/checkbox";
import { FormField, FormItem } from "../ui/form";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { problemType } from "@/types/problem";
import { Label } from "../ui/label";
interface ProbCheckBoxProps {
  probList: problemType;
  task: string;
}

const ProbCheckBox: React.FC<ProbCheckBoxProps> = ({ probList, task }) => {
  if (!probList) {
    return null;
  }
  const form = useForm();
  return (
    <div className="mt-5 flex-column">
      <Form {...form}>
        <FormField
          control={form.control}
          name="items"
          render={({ field }) => {
            return (
              <>
                {Object.entries(probList).map(
                  ([probType, problemList], index) => {
                    return (
                      <>
                        <p>{probType}</p>
                        {problemList.map((prob) => (
                          <>
                            <FormItem>
                              <Checkbox
                                id={prob.id.toString()}
                                key={prob.id}
                                className="mr-3"
                                checked={field.value?.includes(prob.id)}
                                onCheckedChange={(value) => {
                                  //localStorage.setItem(task+'/'+prob.id.toString(),value.toString());
                                  // const selectedProbNum = localStorage.getItem(task);
                                  if (value) {
                                    field.onChange([...field?.value, prob.id]);
                                    //localStorage.setItem(task,(parseInt(selectedProbNum??'0')+1).toString());
                                  } else {
                                    field.onChange(
                                      field.value.filter(
                                        (item: number) => item !== prob.id
                                      )
                                    );
                                    //localStorage.setItem(task,(parseInt(selectedProbNum??'0')-1).toString());
                                  }
                                }}
                              />
                              <Label>{prob.name}</Label>
                            </FormItem>
                          </>
                        ))}
                      </>
                    );
                  }
                )}
              </>
            );
          }}
        />
      </Form>
    </div>
  );
};
export default ProbCheckBox;
