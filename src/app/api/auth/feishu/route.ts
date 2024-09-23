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
  // try {
  const params = await get_user_access_token(code);
  // const userInfoData = await get_user_info(
  // 	params.user_access_token,
  // 	params.open_id
  // );
  if (!params) {
    return NextResponse.json(
      { message: 'get user info failed' },
      { status: 500 },
    );
  }
  await loginFromX(params.open_id, params?.name, 'feishu');
  // } catch (err) {
  // 	return NextResponse.json(
  // 		{ message: "feishu auth failed" },
  // 		{ status: 500 }
  // 	);
  // }
  return redirect('/dashboard');
}
