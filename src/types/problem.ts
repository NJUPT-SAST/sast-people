import { problem } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type insertProblemType = Omit<InferSelectModel<typeof problem>, "id">;

export type problemType = {
  [problemClass: string]: Omit<InferSelectModel<typeof problem>, "class">[];
};
