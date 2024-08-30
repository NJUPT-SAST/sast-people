import * as lark from "@larksuiteoapi/node-sdk";
import axios from "axios";
import SHA1 from "crypto-js/sha1";
const appId = process.env.APP_ID as string;
const appSecret = process.env.APP_SECRET as string;
const client = new lark.Client({
	appId: process.env.APP_ID as string,
	appSecret: process.env.APP_SECRET as string,
	disableTokenCache: false,
});

const jsapiTicketCache = {
	ticket: "",
	expireTime: 0,
};

export async function getAccessToken() {
	const res = await client.auth.tenantAccessToken.internal({
		data: {
			app_id: process.env.APP_ID as string,
			app_secret: process.env.APP_SECRET as string,
		},
	});
	return (res as any).tenant_access_token;
}

export async function getAppAccessToken() {
	let data = await client.auth.appAccessToken.internal({
		data: {
			app_id: appId,
			app_secret: appSecret,
		},
	});
	return (data as any).app_access_token;
}

export async function getJsapiTicket() {
	const now = Date.now();
	if (jsapiTicketCache.ticket && jsapiTicketCache.expireTime > now) {
		return jsapiTicketCache.ticket;
	}
	const res = await axios.post(
		"https://open.feishu.cn/open-apis/jssdk/ticket/get",
		{},
		{
			headers: {
				Authorization: `Bearer ${await getAccessToken()}`,
			},
		}
	);
	jsapiTicketCache.ticket = (res as any).data.data.ticket;
	console.log("js api ticket refreshed: ", jsapiTicketCache.ticket);
	jsapiTicketCache.expireTime = Date.now() + 7200;
	return (res as any).data.data.ticket;
}

export async function getSignature(url: string) {
	const ticket = await getJsapiTicket();
	const timestamp = Date.now();
	const nonceStr = process.env.NONCESTR;
	const verify_str = `jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`;
	const signature = SHA1(verify_str).toString();
	console.log(verify_str, {
		appid: process.env.APP_ID,
		timestamp,
		nonceStr: nonceStr,
		signature,
	});
	return {
		appid: process.env.APP_ID,
		timestamp,
		nonceStr: nonceStr,
		signature,
	};
}

export async function get_user_access_token(code: string): Promise<{
	name: string;
	avatar: string;
	open_id: string;
	union_id: string;
	user_access_token: string;
}> {
	let data;
	let appAccessToken = await getAppAccessToken();
	await axios
		.post(
			"https://open.feishu.cn/open-apis/authen/v1/access_token",
			{
				grant_type: "authorization_code",
				code,
			},
			{
				headers: {
					Authorization: `Bearer ${appAccessToken}`,
				},
			}
		)
		.then((res) => {
			// console.log(res.data)
			data = {
				name: res.data.data.name,
				avatar: res.data.data.avatar_url,
				open_id: res.data.data.open_id,
				union_id: res.data.data.union_id,
				user_access_token: res.data.data.access_token,
			};
		});
	if (!data) {
		throw new Error("get user access token failed");
	}
	console.log(data);
	return data;
}

export async function get_user_info(
	user_access_token: string,
	user_id: string
) {
	console.log(user_access_token, user_id);
	const data = await client.contact.user.get(
		{
			path: {
				user_id: user_id,
			},
			params: {
				user_id_type: "open_id",
			},
		},
		{
			headers: {
				Authorization: `Bearer ${user_access_token}`,
			},
		}
	);
	return data;
}
