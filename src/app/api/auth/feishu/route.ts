import 'server-only';
import { loginFromX } from '@/action/user/auth';
import { get_user_access_token, get_user_info } from '@/action/user/feishu';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  if (!code) {
    return NextResponse.json({ message: 'code is required' }, { status: 400 });
  }
  
  const paramsResult = await get_user_access_token(code);
  if (!paramsResult.success) {
    return NextResponse.json(
      { message: paramsResult.error },
      { status: 500 },
    );
  }
  
  const params = paramsResult.data;
  
  const loginResult = await loginFromX(params.open_id, params?.name, 'feishu');
  if (!loginResult.success) {
    return NextResponse.json(
      { message: loginResult.error },
      { status: 500 },
    );
  }
  
  return redirect('/dashboard');
}
