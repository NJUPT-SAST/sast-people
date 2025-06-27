import { relations } from "drizzle-orm/relations";
// TODO: v2 db import { user, flowType, flow, flowStep, steps, examMap, problem, college } from "./schema";

// TODO: v2 db
// export const flowTypeRelations = relations(flowType, ({one, many}) => ({
// 	user: one(user, {
// 		fields: [flowType.createBy],
// 		references: [user.uid]
// 	}),
// 	flows: many(flow),
// 	steps: many(steps),
// }));

// TODO: v2 db
// export const userRelations = relations(user, ({one, many}) => ({
// 	flowTypes: many(flowType),
// 	college: one(college, {
// 		fields: [user.college],
// 		references: [college.id]
// 	}),
// }));

// TODO: v2 db
// export const flowStepRelations = relations(flowStep, ({one, many}) => ({
// 	flow: one(flow, {
// 		fields: [flowStep.flowId],
// 		references: [flow.id]
// 	}),
// 	step: one(steps, {
// 		fields: [flowStep.stepId],
// 		references: [steps.id]
// 	}),
// 	examMaps: many(examMap),
// }));

// TODO: v2 db
// export const flowRelations = relations(flow, ({one, many}) => ({
// 	flowSteps: many(flowStep),
// 	flowType: one(flowType, {
// 		fields: [flow.flowTypeId],
// 		references: [flowType.id]
// 	}),
// }));

// TODO: v2 db 
// export const stepsRelations = relations(steps, ({one, many}) => ({
// 	flowSteps: many(flowStep),
// 	problems: many(problem),
// 	flowType: one(flowType, {
// 		fields: [steps.flowTypeId],
// 		references: [flowType.id]
// 	}),
// }));

// TODO: v2 db
// export const examMapRelations = relations(examMap, ({one}) => ({
// 	flowStep: one(flowStep, {
// 		fields: [examMap.flowStepId],
// 		references: [flowStep.id]
// 	}),
// 	problem: one(problem, {
// 		fields: [examMap.problemId],
// 		references: [problem.id]
// 	}),
// }));

// TODO: v2 db
// export const problemRelations = relations(problem, ({one, many}) => ({
// 	examMaps: many(examMap),
// 	// TODO: v2 db step: one(steps, {
// 	// TODO: v2 db 	fields: [problem.stepId],
// 	// TODO: v2 db 	references: [steps.id]
// 	// TODO: v2 db }),
// }));

// TODO: v2 db
// export const collegeRelations = relations(college, ({many}) => ({
// 	users: many(user),
// }));