import { NextRequest, NextResponse } from 'next/server';
import { batchUpsertPoint, upsertPoint } from '@/action/user-flow/user-point/upsert';
import { userPoint } from '@/db/schema';
import { InferInsertModel } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    if (action === 'batch') {
      const values: Array<InferInsertModel<typeof userPoint>> = data;
      await batchUpsertPoint(values);
      return NextResponse.json({ success: true, message: '批量更新成功' });
    } else if (action === 'single') {
      const { userFlowId, problemId, point } = data;
      await upsertPoint(userFlowId, problemId, point);
      return NextResponse.json({ success: true, message: '更新成功' });
    } else {
      return NextResponse.json({ success: false, message: '无效的操作类型' }, { status: 400 });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : '操作失败' },
      { status: 500 }
    );
  }
}