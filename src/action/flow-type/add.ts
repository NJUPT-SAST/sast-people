'use server';


// TODO: v2 db 
// export async function addFlowType(values: z.infer<typeof addFlowTypeSchema>) {
//   const session = await verifySession();
//   await verifyRole(1);

//   await db.insert(flowType).values({
//     name: values.name,
//     description: values.description,
//     createBy: session.uid,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   });

//   revalidatePath('/dashboard/flow-types');
// }
