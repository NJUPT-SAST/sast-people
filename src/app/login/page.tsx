import { FeishuSDKInject } from "@/components/feishuInject";
import BlurIn from "@/components/magicui/blur-in";
import FlickeringGrid from "@/components/magicui/flickering-grid";
import { TestLogin } from "@/components/testLogin";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { SHA256 } from "crypto-js";
import { cookies } from "next/headers";
import { getCurrentRedirectUri, useCodeChallenge } from "@/action/user/link";
import { redirect } from "next/navigation";
import { LinkLogin } from "@/components/linkLogin";

const Login = async () => {
	return (
		<>
			<div className="h-screen w-screen grid grid-cols-1 lg:grid-cols-2">
				<div className="h-full relative bg-primary text-white hidden col-span-1 p-5 lg:flex justify-center flex-col">
					<div className="absolute top-5 left-5">
						<Image
							src="/images/white-logo.png"
							alt="123123"
							width={100}
							height={50}
						/>
					</div>
					<div className="space-y-4 *:font-light *:font-sans z-10">
						<BlurIn word="开源平等" />
						<BlurIn word="薪火相传" />
					</div>
					<div className="absolute bottom-[40px] right-[-10vw] w-full h-full">
						<div className="relative size-[1000px] border-none rounded-lg w-full overflow-hidden border">
							<FlickeringGrid
								className="z-0 absolute inset-0 [mask:radial-gradient(circle_at_center,#fff_300px,transparent_0)]"
								squareSize={4}
								gridGap={5}
								color="#ffffff"
								maxOpacity={0.5}
								flickerChance={0.1}
								height={1000}
								width={1000}
							/>
						</div>
					</div>
				</div>
				<div className="h-full flex justify-center items-center flex-col gap-8 col-span-1">
					<div className="flex gap-2 flex-col items-center">
						<div className="text-2xl font-semibold">
							登录到 SAST Pass
						</div>
						<div className="text-sm text-gray-500">
							开启你的科协之旅
						</div>
					</div>
					<LinkLogin />
					{process.env.NODE_ENV === "development" && <TestLogin />}
				</div>
			</div>
			<FeishuSDKInject />
		</>
	);
};

export default Login;
