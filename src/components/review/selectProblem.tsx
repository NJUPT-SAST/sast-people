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
import { useFlowTypeList } from "@/hooks/useFlowTypeList";
import { desc, eq } from "drizzle-orm";
import { useEffect , useState} from "react";
  
export default  function SelectProblem() {
    const [selectedFlow, setSelectedFlow] = useState() ;
    const [probList,setProbList] = useState([]);
    const flow = useFlowTypeList();
    useEffect(()=>{
        if(selectedFlow)
        {
            
            const probList = await db 
            .select ()
            .from(problem)
            .where(eq(problem.stepId,await db
                .select()
                .from(steps)
                .where(eq(steps.flowTypeId,selectedFlow
                ))
                .first()
                ))
        }
    })
    return (
       <div>
         {flow?<Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="请选择试卷" />
            </SelectTrigger>
            <SelectContent>
                {(flow as any).map((flow: { id: number; name: string }) => (
                    <SelectItem key={flow.id} value={flow.id.toString()}> 
                        {flow.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>:null}
       </div>
    );
}
