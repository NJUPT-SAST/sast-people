import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { verifyRole } from "@/lib/dal";
import { and, asc, count, desc, eq, ilike, or, SQL } from "drizzle-orm";

export type UserListParams = {
  page: number;
  pageSize: number;
  search?: string;
  sortBy?: keyof typeof user;
  sortOrder?: "asc" | "desc";
};

export const useUserList = async ({
  page,
  pageSize,
  search,
  sortBy = "createdAt",
  sortOrder = "desc",
}: UserListParams) => {
  await verifyRole(1);
  const offset = (page - 1) * pageSize;

  let whereConditions: SQL<unknown> | undefined = eq(user.isDeleted, false);

  if (search) {
    whereConditions = and(
      whereConditions,
      or(
        ilike(user.name, `%${search}%`),
        ilike(user.studentId, `%${search}%`),
        ilike(user.phone, `%${search}%`),
        ilike(user.email, `%${search}%`)
      )
    );
  }

  const totalCountResult = await db
    .select({ count: count() })
    .from(user)
    .where(whereConditions)
    .execute();

  const totalCount = Number(totalCountResult[0]?.count) || 0;

  const users = await db
    .select()
    .from(user)
    .where(whereConditions)
    .orderBy((column) =>
      sortOrder === "asc"
        ? asc(column[sortBy as keyof typeof column])
        : desc(column[sortBy as keyof typeof column])
    )
    .limit(pageSize)
    .offset(offset)
    .execute();

  return {
    users,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
  };
};
