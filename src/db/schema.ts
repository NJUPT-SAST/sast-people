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
} from "drizzle-orm/pg-core";

export const status = pgEnum("status", [
	"pending",
	"accepted",
	"rejected",
	"ongoing",
]);

// user 表
export const user = pgTable("user", {
	id: serial("uid").primaryKey(),
	name: text("name").notNull(),
	studentId: varchar("student_id", { length: 20 }),
	college: integer("college").references(() => college.id),
	major: text("major"),
	phoneNumber: varchar("phone_number", { length: 20 }).unique(),
	email: varchar("email", { length: 255 }).unique(),
	github: varchar("github", { length: 255 }),
	blog: varchar("blog", { length: 255 }),
	personalStatement: text("personal_statement"),
	birthday: date("birthday"),
	isDeleted: boolean("is_deleted").default(false),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	department: varchar("department", { length: 255 }),
	group: varchar("group", { length: 255 }),
	role: integer("role").default(0),
	feishuOpenId: varchar("feishu_open_id", { length: 255 }).unique(),
	sastLinkOpenId: varchar("sast_link_open_id", { length: 255 }).unique(),
	// flow todo
});

// FlowType 表
export const flowType = pgTable("flow_type", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	description: text("description"),
	createdAt: timestamp("created_at").notNull(), // 使用 timestamp 类型和 SQL 默认值
	updatedAt: timestamp("updated_at").notNull(),
	isDeleted: boolean("is_deleted").default(false),
	createBy: integer("create_by")
		.references(() => user.id)
		.notNull(), // 外键关联到 user 表的 id
});

// Steps 表
export const steps = pgTable(
	"steps",
	{
		id: serial("id").primaryKey(),
		flowTypeId: integer("flow_type_id").references(() => flowType.id), // 外键关联 FlowType 表
		order: integer("order").notNull(),
		label: text("label").notNull(),
		name: text("name").notNull(),
		description: text("description"),
	},
	(steps) => {
		return {
			uniqueFlowTypeOrder: uniqueIndex("unique_flow_type_order_index").on(
				steps.flowTypeId,
				steps.order,
			),
		};
	},
);

// Problem 表
export const problem = pgTable("problem", {
	id: serial("id").primaryKey(),
	stepId: integer("step_id").references(() => steps.id), // 外键关联 Steps 表
	name: text("name").notNull(), // 问题名称
	maxScore: integer("max_score").notNull(), // 最大得分
});

export const flow = pgTable("flow", {
	id: serial("id").primaryKey(),
	uid: integer("uid").notNull(), // 用户 ID
	flowTypeId: integer("flow_type_id").references(() => flowType.id), // 外键关联 FlowType 表
	isAccepted: boolean("is_accepted").default(false), // 是否被接受
});

// FlowStep 表
export const flowStep = pgTable("flow_step", {
	id: serial("id").primaryKey(),
	flowId: integer("flow_id").references(() => flow.id), // 外键关联 Flow 表
	stepId: integer("step_id").references(() => steps.id), // 外键关联 Steps 表
	label: text("label").notNull(), // 步骤标签
	status: status("status").notNull(), // 步骤状态
});

export const examMap = pgTable("exam_map", {
	id: serial("id").primaryKey(),
	flowStepId: integer("flow_step_id").references(() => flowStep.id), // 外键关联 FlowSteps 表
	problemId: integer("problem_id").references(() => problem.id), // 问题 ID
	score: integer("score").notNull(), // 评分
	judgerId: integer("judger_id").notNull(), // 评审者 ID
	judgeTime: timestamp("judge_time").notNull(), // 评审时间
});

// CollegeList 表
export const college = pgTable("college", {
	id: serial("id").primaryKey(), // 学院的唯一标识
	name: text("name").notNull(), // 学院名称
});

// MajorList 表
export const major = pgTable("major", {
	id: serial("id").primaryKey(), // 专业的唯一标识
	name: text("name").notNull(), // 专业名称
});

// DepartmentList 表
export const department = pgTable("department", {
	id: serial("id").primaryKey(), // 部门的唯一标识
	name: text("name").notNull(), // 部门名称
});

// GroupList 表
export const group = pgTable("group", {
	id: serial("id").primaryKey(), // 组的唯一标识
	name: text("name").notNull(), // 组名称
});
