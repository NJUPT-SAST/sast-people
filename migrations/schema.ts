import { pgTable, serial, text, foreignKey, timestamp, boolean, integer, uniqueIndex, unique, varchar, date, pgEnum } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const status = pgEnum("status", ['pending', 'accepted', 'rejected', 'ongoing'])



export const college = pgTable("college", {
	id: serial("id").primaryKey().notNull(),
	name: text("name").notNull(),
});

export const department = pgTable("department", {
	id: serial("id").primaryKey().notNull(),
	name: text("name").notNull(),
});

export const flowType = pgTable("flow_type", {
	id: serial("id").primaryKey().notNull(),
	name: text("name").notNull(),
	description: text("description"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
	isDeleted: boolean("is_deleted").default(false),
	createBy: integer("create_by"),
},
(table) => {
	return {
		flowTypeCreateByUserUidFk: foreignKey({
			columns: [table.createBy],
			foreignColumns: [user.uid],
			name: "flow_type_create_by_user_uid_fk"
		}),
	}
});

export const group = pgTable("group", {
	id: serial("id").primaryKey().notNull(),
	name: text("name").notNull(),
});

export const major = pgTable("major", {
	id: serial("id").primaryKey().notNull(),
	name: text("name").notNull(),
});

export const flowStep = pgTable("flow_step", {
	id: serial("id").primaryKey().notNull(),
	flowId: integer("flow_id"),
	stepId: integer("step_id"),
	label: text("label").notNull(),
	status: text("status").notNull(),
},
(table) => {
	return {
		flowStepFlowIdFlowIdFk: foreignKey({
			columns: [table.flowId],
			foreignColumns: [flow.id],
			name: "flow_step_flow_id_flow_id_fk"
		}),
		flowStepStepIdStepsIdFk: foreignKey({
			columns: [table.stepId],
			foreignColumns: [steps.id],
			name: "flow_step_step_id_steps_id_fk"
		}),
	}
});

export const flow = pgTable("flow", {
	id: serial("id").primaryKey().notNull(),
	uid: integer("uid").notNull(),
	flowTypeId: integer("flow_type_id"),
	isAccepted: boolean("is_accepted").default(false),
},
(table) => {
	return {
		flowFlowTypeIdFlowTypeIdFk: foreignKey({
			columns: [table.flowTypeId],
			foreignColumns: [flowType.id],
			name: "flow_flow_type_id_flow_type_id_fk"
		}),
	}
});

export const examMap = pgTable("exam_map", {
	id: serial("id").primaryKey().notNull(),
	flowStepId: integer("flow_step_id"),
	problemId: integer("problem_id"),
	score: integer("score").notNull(),
	judgerId: integer("judger_id").notNull(),
	judgeTime: timestamp("judge_time", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		examMapFlowStepIdFlowStepIdFk: foreignKey({
			columns: [table.flowStepId],
			foreignColumns: [flowStep.id],
			name: "exam_map_flow_step_id_flow_step_id_fk"
		}),
		examMapProblemIdProblemIdFk: foreignKey({
			columns: [table.problemId],
			foreignColumns: [problem.id],
			name: "exam_map_problem_id_problem_id_fk"
		}),
		uniqueFlowStepProblem: unique("unique_flow_step_problem_index").on(table.flowStepId, table.problemId),
	}
});

export const problem = pgTable("problem", {
	id: serial("id").primaryKey().notNull(),
	stepId: integer("step_id"),
	name: text("name").notNull(),
	maxScore: integer("max_score").notNull(),
},
(table) => {
	return {
		problemStepIdStepsIdFk: foreignKey({
			columns: [table.stepId],
			foreignColumns: [steps.id],
			name: "problem_step_id_steps_id_fk"
		}),
	}
});

export const steps = pgTable("steps", {
	id: serial("id").primaryKey().notNull(),
	flowTypeId: integer("flow_type_id"),
	order: integer("order").notNull(),
	label: text("label").notNull(),
	name: text("name").notNull(),
	description: text("description"),
},
(table) => {
	return {
		uniqueFlowTypeOrderIdx: uniqueIndex("unique_flow_type_order_index").using("btree", table.flowTypeId.asc().nullsLast(), table.order.asc().nullsLast()),
		stepsFlowTypeIdFlowTypeIdFk: foreignKey({
			columns: [table.flowTypeId],
			foreignColumns: [flowType.id],
			name: "steps_flow_type_id_flow_type_id_fk"
		}),
	}
});

export const user = pgTable("user", {
	uid: serial("uid").primaryKey().notNull(),
	name: text("name").notNull(),
	studentId: varchar("student_id", { length: 20 }),
	college: integer("college"),
	major: text("major"),
	phoneNumber: varchar("phone_number", { length: 20 }),
	email: varchar("email", { length: 255 }),
	github: varchar("github", { length: 255 }),
	blog: varchar("blog", { length: 255 }),
	personalStatement: text("personal_statement"),
	birthday: date("birthday"),
	isDeleted: boolean("is_deleted").default(false),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
	department: text("department"),
	group: text("group"),
	role: integer("role").default(0),
	feishuOpenId: varchar("feishu_open_id", { length: 255 }),
	sastLinkOpenId: varchar("sast_link_open_id", { length: 255 }),
},
(table) => {
	return {
		userCollegeCollegeIdFk: foreignKey({
			columns: [table.college],
			foreignColumns: [college.id],
			name: "user_college_college_id_fk"
		}),
		userPhoneNumberUnique: unique("user_phone_number_unique").on(table.phoneNumber),
		userEmailUnique: unique("user_email_unique").on(table.email),
		userFeishuOpenIdUnique: unique("user_feishu_open_id_unique").on(table.feishuOpenId),
		userSastLinkOpenIdUnique: unique("user_sast_link_open_id_unique").on(table.sastLinkOpenId),
	}
});