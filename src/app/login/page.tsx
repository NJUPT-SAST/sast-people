import { FeishuSDKInject } from "@/components/feishuInject";
import { TestLogin } from "@/components/testLogin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { verifySession } from "@/lib/dal";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useFormStatus } from "react-dom";

const Login = async () => {
  return (
    <>
      <div className="h-screen w-screen grid grid-cols-1 lg:grid-cols-2">
        <div className="h-full bg-black text-white hidden col-span-1 p-5 lg:flex justify-between flex-col">
          <div>
            <Image
              src="/images/white-logo.png"
              alt="123123"
              width={100}
              height={50}
            />
          </div>
          <div>"开源平等，薪火相传"</div>
        </div>
        <div className="h-full flex justify-center items-center flex-col gap-8 col-span-1">
          <div className="flex gap-2 flex-col items-center">
            <div className="text-2xl font-semibold">登录到 SAST Pass</div>
            <div className="text-sm text-gray-500">开启你的科协之旅</div>
          </div>
          <Button>使用 SAST Link 登录</Button>
          {process.env.NODE_ENV === "development" && <TestLogin />}
        </div>
      </div>
      <FeishuSDKInject />
    </>
  );
};

export default Login;
