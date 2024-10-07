import { backward, forward } from '@/action/flow/edit';
import { useFlowStepsInfo } from '@/hooks/useFlowStepsInfo';
import { verifyRole } from '@/lib/dal';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  req: NextRequest,
  { params }: { params: { fid: number } },
) => {
  await verifyRole(1);
  return NextResponse.json(await useFlowStepsInfo(params.fid));
};

// export const POST = async (
//   req: NextRequest,
//   { params }: { params: { fid: number } },
// ) => {
//   await verifyRole(1);
//   const res = await req.json();
//   const type = res.type;
//   if (type === 'forward') {
//     await forward(res.fid, res.currentStepOrder);
//   } else if (type === 'backward') {
//     await backward(res.fid, res.currentStepOrder);
//   } else {
//     return NextResponse.json({ status: 400, body: 'Invalid type' });
//   }
//   return NextResponse.json({ success: true });
// };
