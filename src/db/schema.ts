import { relations, sql } from "drizzle-orm";
import {
  integer,
  text,
  boolean,
  pgTable,
  date,
  timestamp,
  varchar,
  uniqueIndex,
  serial,
  pgEnum,
  point,
} from "drizzle-orm/pg-core";
import { title } from "process";

export const flowStepTypeEnum = pgEnum("flow_step_type_enum", [
  "registering",
  "checking",
  "judging",
  "email",
  "finished",
]);


export const userFlowStatusEnum = pgEnum("user_flow_status_enum", [
  "pending",
  "accepted",
  "rejected",
  "ongoing",
]);

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 30}).notNull(),
  studentId: varchar("student_id", { length: 16 }).unique(),
  email: varchar("email", { length: 254 }),
  phone: varchar("phone", { length: 16 }),
  college: varchar("college", { length: 50 }),
  major: varchar("major", { length: 50 }),
  departments: varchar("department", { length: 50 }).array().notNull().default(sql`ARRAY[]::text[]`),
  linkOpenid: varchar("link_openid", { length: 255 }).unique(),
  feishuOpenid: varchar("feishu_openid", { length: 255 }).unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().$onUpdate(() => sql`now()`),
  isDeleted: boolean("is_deleted").default(false),
  
  // TODO: v2 db role: integer("role").default(0),
  // TODO: v2 db feishuOpenId: varchar("feishu_open_id", { length: 255 }).unique(),
  // TODO: v2 db sastLinkOpenId: varchar("sast_link_open_id", { length: 255 }).unique(),

});

export const flow = pgTable('flow', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 100 }).notNull(),
  description: varchar('description', { length: 1000 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  startedAt: timestamp('started_at').notNull().defaultNow(),
  endedAt: timestamp('ended_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().$onUpdate(() => sql`now()`),
  isDeleted: boolean("is_deleted").default(false),

  // TODO: v2 db userId: integer('user_id').references(() => user.id).notNull(), // 外键关联 User 表
  // TODO: v2 db flowTypeId: integer('flow_type_id').references(() => flowType.id).notNull(), // 外键关联 FlowType 表
  // TODO: v2 db currentStepId: integer('current_step_id').references(() => step.id), // 当前步骤
  // TODO: v2 db isAccepted: boolean('is_accepted'), // 是否被接受
});

// TODO: v2 db 删除 FlowType 表
// export const flowType = pgTable("flow_type", {
//   id: serial("id").primaryKey(),
//   name: varchar("name", { length: 100}).notNull(),
//   description: varchar("description", { length: 100 }),
//   createdAt: timestamp("created_at").notNull(),
//   updatedAt: timestamp("updated_at").notNull(),
//   isDeleted: boolean("is_deleted").default(false),
//   createBy: integer("create_by")
//     .references(() => user.id)
//     .notNull(),
// });

// TODO: v2 db
// export const step = pgTable("step", {
//     id: serial("id").primaryKey(),
//     flowTypeId: integer("flow_type_id")
//       // .references(() => flowType.id)
//       .notNull(),
//     order: integer("order").notNull(),
//     label: text("label").notNull(),
//     name: text("name").notNull(),
//     description: text("description"),
//   },
//   (steps) => {
//     return {
//       uniqueFlowTypeOrder: uniqueIndex("unique_flow_type_order_index").on(
//         steps.flowTypeId,
//         steps.order
//       ),
//     };
//   }
// );

export const flowStep = pgTable('flow_step', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 100 }).notNull(),
  description: varchar('description', { length: 1000 }),
  type: flowStepTypeEnum('type').notNull(),
  order: integer('order').notNull(),
  fkFlowId: integer('fk_flow_id').references(() => flow.id).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().$onUpdate(() => sql`now()`),
  isDeleted: boolean("is_deleted").default(false),

  // TODO: v2 db stepId: integer('step_id').references(() => step.id).notNull(), // 外键关联 Steps 表
  // status: userFlowStatusEnum('status').notNull().default('pending'), // 步骤状态
  // startedAt: timestamp('started_at'),
  // completedAt: timestamp('completed_at'),
});

export const userFlow = pgTable('user_flow', {
  id: serial('id').primaryKey(),
  status: userFlowStatusEnum('status').notNull().default('pending'),
  currentStepOrder: integer('current_step_order').notNull(),
  fkFlowId: integer('fk_flow_id').references(() => flow.id).notNull(),
  fkUserId: integer('fk_user_id').references(() => user.id).notNull(),
});

export const problem = pgTable("problem", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  score: integer("score").notNull(),
  fkFlowStepId: integer("fk_flow_step_id").references(() => flowStep.id).notNull(),

  // TODO: v2 db
  // stepId: integer("step_id").references(() => step.id), // 外键关联 Steps 表
  // class: text("class").notNull(), // 问题类别
  // name: text("name").notNull(), // 问题名称
  // maxScore: integer("max_score").notNull(), // 最大得分
});

export const email = pgTable("email", {
  id: serial("id").primaryKey(),
  subject: varchar("subject", { length: 255 }).notNull(),
  content: text("content").notNull(),
  fkFlowStepId: integer("fk_flow_step_id").references(() => flowStep.id).notNull(),
});

export const userPoint = pgTable("user_point", {
  id: serial("id").primaryKey(),
  fkUserFlowId: integer("fk_user_flow_id").references(() => userFlow.id).notNull(),
  fkProblemId: integer("fk_problem_id").references(() => problem.id).notNull(),
  point: point("point").notNull(),
});

// TODO: v2 db
// export const examMap = pgTable(
//   "exam_map",
//   {
//     id: serial("id").primaryKey(),
//     flowStepId: integer("flow_step_id").references(() => flowStep.id), // 外键关联 FlowSteps 表
//     problemId: integer("problem_id").references(() => problem.id), // 问题 ID
//     score: integer("score").notNull(), // 评分
//     judgerId: integer("judger_id").notNull(), // 评审者 ID
//     judgeTime: timestamp("judge_time").notNull(), // 评审时间
//   },
//   (examMap) => {
//     return {
//       uniqueFlowStepProblem: uniqueIndex("unique_flow_step_problem_index").on(
//         examMap.flowStepId,
//         examMap.problemId
//       ),
//     };
//   }
// );

// TODO: v2 db
// // CollegeList 表
// export const college = pgTable("college", {
//   id: serial("id").primaryKey(), // 学院的唯一标识
//   name: text("name").notNull(), // 学院名称
// });

// TODO: v2 db
// // MajorList 表
// export const major = pgTable("major", {
//   id: serial("id").primaryKey(), // 专业的唯一标识
//   name: text("name").notNull(), // 专业名称
// });

// TODO: v2 db
// // DepartmentList 表
// export const department = pgTable("department", {
//   id: serial("id").primaryKey(), // 部门的唯一标识
//   name: text("name").notNull(), // 部门名称
// });

// TODO: v2 db
// // GroupList 表
// export const group = pgTable("group", {
//   id: serial("id").primaryKey(), // 组的唯一标识
//   name: text("name").notNull(), // 组名称
// });
