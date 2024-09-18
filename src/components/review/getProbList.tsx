"use server"
import { db } from "@/db/drizzle";
import { problem, steps } from "@/db/schema";
import { eq } from "drizzle-orm";

const getProbList = async (selectedFlow: number)=>{
    try{
        console.log("114514")
        const stepId=await db
            .select()
            .from(steps)
            .where(eq(steps.flowTypeId,selectedFlow
        ));
        console.log('1145514',JSON.stringify(stepId));
        return await db 
            .select ()
            .from(problem)
            .where(eq(problem.stepId,stepId[0].id))
            .orderBy(problem.name)
        }
    catch(e){
        console.error(e);
        return [{}];
    }
}
export default getProbList;