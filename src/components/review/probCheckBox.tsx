import { Checkbox } from "@/components/ui/checkbox";

interface ProbCheckBoxProps {
    probList: {name:string;id:number}[];
    task:string;
}

const ProbCheckBox: React.FC<ProbCheckBoxProps> = ({probList,task}) => {
    if (!probList) 
    {
        return null;
    }
    return (
        <div className="mt-5 flex-column">
            {probList.map((prob: {name:string;id:number}) => (
                
                     <div className="mt-3">
                     <Checkbox 
                     id={prob.id.toString()} 
                     key={prob.id} 
                     className="mr-3"
                     onCheckedChange={ (value)=>{
                        localStorage.setItem(task+prob.id.toString(),value.toString());
                        const selectedProbNum = localStorage.getItem(task);
                        if (value)
                        {
                            localStorage.setItem(task,(parseInt(selectedProbNum??'0')+1).toString());
                        }
                        else
                        {
                            localStorage.setItem(task,(parseInt(selectedProbNum??'0')-1).toString());
                        }
                    }
                    }
                    
                     />

                     <label
                       htmlFor="terms"
                       className="text-md"
                     >
                          {prob.name}
                     </label>
                   </div>
                
            ))
            }
        </div>
    );
};
export default ProbCheckBox;
