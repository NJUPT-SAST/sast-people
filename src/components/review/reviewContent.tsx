"use client";
import { Input } from "../ui/input";
import getProbList from "./getProbList";
import { useState } from "react";
interface ReviewDialogProps {
    task: string;
}
interface ReviewDialogProps {
    name:string;id:number;maxScore:number
}
const ReviewContent: React.FC = () => {
    const task = localStorage.getItem('task');
    const [probList, setProbList] = useState<ReviewDialogProps[]>([]);
    console.log('11451411',task,parseInt(task??'0'));
    if (task && (parseInt(task) === 0) ){
        return (
            <div>
                <text>请先选择阅卷范围</text>
            </div>
        )
    }
    getProbList(parseInt(task??'0')).then((probList) => { if(probList) setProbList(probList as ReviewDialogProps[]); });
    return probList.map((prob: ReviewDialogProps)=>{
        if (localStorage.getItem(task??""+prob.id))
            return <div className="mt-3 flex-row">
                <text>    
                    {prob.name+localStorage.getItem(task??""+prob.id)}
                </text>
                <Input className="" id={prob.id.toString()} placeholder={"满分"+prob.maxScore+"分"} />
            </div>
        return null;
    })
}

export default ReviewContent;