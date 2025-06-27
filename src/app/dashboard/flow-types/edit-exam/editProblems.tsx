// TODO: v2 db import { EditProblems } from '@/components/flowTypes/operations/editProblems';
// TODO: v2 db import { useFlowTypeInfo } from '@/hooks/useFlowTypeInfo';
// TODO: v2 db import { useProblemList } from '@/hooks/useProblemList';
// TODO: v2 db import { useStepWithProblem } from '@/hooks/useStepWithProblem';

// TODO: v2 db 
// export const EditProblemsServer = async ({ id }: { id: string }) => {
//   const { stepList, stepWithProblemId } = await useStepWithProblem(Number(id));
//   const problems = stepWithProblemId
//     ? await useProblemList(stepWithProblemId)
//     : {};
//   return (
//     <>
//       <EditProblems
//         problems={problems}
//         stepList={stepList}
//         currentStepId={stepWithProblemId ?? 0}
//         flowTypeId={Number(id)}
//       />
//     </>
//   );
// };
