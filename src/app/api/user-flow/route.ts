import { NextRequest, NextResponse } from 'next/server';
import { batchUpsertPoint, upsertPoint } from '@/action/user-flow/user-point/upsert';
import { findUserFlowId } from '@/action/user-flow/find';
import { userPoint } from '@/db/schema';
import { InferInsertModel } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');
    const flowId = searchParams.get('flowId');

    if (!studentId || !flowId) {
      return NextResponse.json(
        { success: false, message: '缺少必需参数: studentId 和 flowId' },
        { status: 400 }
      );
    }

    const userFlowId = await findUserFlowId(studentId, Number(flowId));

    if (userFlowId === null) {
      return NextResponse.json(
        { success: false, message: '未找到匹配的用户流程' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, userFlowId });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : '查询失败' },
      { status: 500 }
    );
  }
}
