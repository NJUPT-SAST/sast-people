"use client";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
  } from "@/components/ui/select"
import { db } from "@/db/drizzle";
import { flowType, problem, steps } from "@/db/schema";
import { flowTypeType } from "@/types/flowType";
import { eq } from "drizzle-orm";
import { useEffect , useState} from "react";
import getProbList from "./getProbList";
import ProbCheckBox from "./probCheckBox";
  
const SelectProblem = (data: any)=> {
    const {flow}=data;
    const [selectedFlow, setSelectedFlow] = useState<number >(0);
    const handleSelectChange = (value:string) => {
        setSelectedFlow(value ? parseInt(value) : 0);
    }
    var probList:any = [];

    useEffect(()=>{
         probList = getProbList(selectedFlow);
    },[selectedFlow])

    return (
       <div
       className="mt-3 flex flex-column">
        <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="请选择试卷" />
            </SelectTrigger>
            <SelectContent>
                {flow .map((flow:{
                id: number;
                name: string;
                isDeleted: boolean | null;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                createBy: number;
                }) => (
                    <SelectItem key={flow.id} value={flow.id.toString()}> 
                        {flow.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
        <ProbCheckBox probList={probList}/>
        <text>{JSON.stringify(probList)}{JSON.stringify(selectedFlow)}</text>
       </div>
    );
}
export default SelectProblem;