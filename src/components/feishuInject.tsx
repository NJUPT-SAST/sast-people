"use client";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import Script from "next/script";
import React, { useEffect } from "react";
import { toast } from "sonner";

export const FeishuSDKInject: React.FC = () => {
	const route = useRouter();
	useEffect(() => {
		try {
			if ((window as any).h5sdk) {
				console.log("[环境]: 飞书浏览器");
				toast.loading("飞书自动授权登录中……");
				const url = window.location.href;
				axios.get(`/api/auth?url=${url}`).then((res) => {
					console.log(res);
					const { appid, timestamp, nonceStr, signature } = res.data;
					(window as any).h5sdk.config({
						appId: appid,
						timestamp,
						nonceStr,
						signature,
						onSuccess: (res: any) => {
							console.log(
								`config success: ${JSON.stringify(res)}`
							);
						},
						//鉴权失败回调
						onFail: (err: any) => {
							throw `config failed: ${JSON.stringify(err)}`;
						},
					});
				});
				(window as any).h5sdk.ready(() => {
					console.log("h5sdk is ready");
					(window as any).tt.requestAccess({
						appID: "cli_a640b772ca38500e",
						scopeList: [],
						success: (res: any) => {
							const { code } = res;
							console.log(`requestAccess success: `, res);
							route.replace(`/api/auth/feishu?code=${code}`);
						},
						fail: (error: any) => {
							console.error(`requestAccess failed: `, error);
						},
					});
				});
			}
		} catch (e) {}
	}, []);
	return (
		<>
			<Script
				src="https://lf1-cdn-tos.bytegoofy.com/goofy/lark/op/h5-js-sdk-1.5.29.js"
				strategy="beforeInteractive"
			></Script>
			<Script
				src="https://sf1-scmcdn-cn.feishucdn.com/obj/feishu-static/op/fe/devtools_frontend/remote-debug-0.0.1-alpha.6.js"
				strategy="beforeInteractive"
			></Script>
		</>
	);
};
