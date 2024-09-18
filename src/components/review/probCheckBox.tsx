import { CheckboxItem } from "@radix-ui/react-dropdown-menu";
import exp from "constants";

interface ProbCheckBoxProps {
    probList: {name:string;id:number}[];
}

const ProbCheckBox: React.FC<ProbCheckBoxProps> = ({probList}) => {
    if (!probList) 
    {
        return null;
    }
    return (
        <div className="mt-3">
            {probList.map((prob: {name:string;id:number})=>(
                
                    <CheckboxItem id={prob.id.toString()} key={prob.id}>
                        {prob.name}
                    </CheckboxItem>
                
            ))
            }
        </div>
    );
};
export default ProbCheckBox;