"use server"
import { user } from "@/db/schema";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
const checkUser =async(data: string) => {
    try {
        const userInfo = await db
            .select()
            .from(user)
            .where(eq(user.studentId,data));
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