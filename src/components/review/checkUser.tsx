"use server"
import { user } from "@/db/schema";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
const checkUser =async(data: string) => {
    try {
        console.log('114514',data);
        const userInfo = await db
            .select()
            .from(user)
            .where(eq(user.student_id,data));
        if (userInfo.length>0)
            return true;
        return false;
    }
    catch(e){
        console.error(e);
        return false;
    }
}
export default checkUser;