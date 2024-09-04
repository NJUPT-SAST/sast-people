"use server"
import { db } from "@/db/drizzle";
import { college } from "@/db/schema";

export const useCollegeList = async () => {
	const collegeList = await db.select().from(college).orderBy(college.id);
	return collegeList;
};
