'use client';
import { flowTypeType } from '@/types/flowType';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useRouter } from 'next/navigation';

// TODO: v2 db
// export const SelectFlow = ({
//   flowTypes,
//   defaultFlowTypeId,
// }: {
//   flowTypes: flowTypeType[];
//   defaultFlowTypeId?: string;
// }) => {
//   const router = useRouter();
//   return (
//     <Select
//       onValueChange={(value) => router.push(`/dashboard/recruitment/${value}`)}
//       defaultValue={defaultFlowTypeId}
//     >
//       <SelectTrigger className="w-[220px]">
//         <SelectValue placeholder="请选择需要操作的流程类别" />
//       </SelectTrigger>
//       <SelectContent>
//         {flowTypes.map((flowType) => (
//           <SelectItem
//             key={`flowType_${flowType.id}`}
//             value={flowType.id.toString()}
//           >
//             {flowType.name}
//           </SelectItem>
//         ))}
//       </SelectContent>
//     </Select>
//   );
// };
