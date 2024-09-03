import { relations } from "drizzle-orm/relations";
import { user, flowType, flow, flowStep, steps, examMap, problem, college } from "./schema";

export const flowTypeRelations = relations(flowType, ({one, many}) => ({
	user: one(user, {
		fields: [flowType.createBy],
		references: [user.uid]
	}),
	flows: many(flow),
	steps: many(steps),
}));

export const userRelations = relations(user, ({one, many}) => ({
	flowTypes: many(flowType),
	college: one(college, {
		fields: [user.college],
		references: [college.id]
	}),
}));

export const flowStepRelations = relations(flowStep, ({one, many}) => ({
	flow: one(flow, {
		fields: [flowStep.flowId],
		references: [flow.id]
	}),
	step: one(steps, {
		fields: [flowStep.stepId],
		references: [steps.id]
	}),
	examMaps: many(examMap),
}));

export const flowRelations = relations(flow, ({one, many}) => ({
	flowSteps: many(flowStep),
	flowType: one(flowType, {
		fields: [flow.flowTypeId],
		references: [flowType.id]
	}),
}));

export const stepsRelations = relations(steps, ({one, many}) => ({
	flowSteps: many(flowStep),
	problems: many(problem),
	flowType: one(flowType, {
		fields: [steps.flowTypeId],
		references: [flowType.id]
	}),
}));

export const examMapRelations = relations(examMap, ({one}) => ({
	flowStep: one(flowStep, {
		fields: [examMap.flowStepId],
		references: [flowStep.id]
	}),
	problem: one(problem, {
		fields: [examMap.problemId],
		references: [problem.id]
	}),
}));

export const problemRelations = relations(problem, ({one, many}) => ({
	examMaps: many(examMap),
	step: one(steps, {
		fields: [problem.stepId],
		references: [steps.id]
	}),
}));

export const collegeRelations = relations(college, ({many}) => ({
	users: many(user),
}));