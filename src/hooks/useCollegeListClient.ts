"use client"
import { userType } from "@/types/user";
import axios from "axios";
import { useEffect, useState } from "react";

export const useCollegeListClient = () => {
    const [collegeList, setCollegeList] = useState<{id: number, name: string}[]>([]);
    useEffect(()=>{
        axios.get("/api/colleges").then((res)=>{
            setCollegeList(res.data)
        })
    },[])
    return collegeList
  }