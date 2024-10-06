"use server"

import { db } from "@/db/drizzle"
import { user } from "@/db/schema"
import { verifyRole } from "@/lib/dal"
import { eq } from "drizzle-orm"

export const banUser = async (uid: number)=>{
    await verifyRole(1)
    // ban user
    await db.update(user).set({isDeleted: true}).where(eq(user.id, uid))
    return true
}