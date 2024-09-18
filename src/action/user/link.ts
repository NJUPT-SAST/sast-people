"use server"

import { SHA256 } from "crypto-js";
import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function redirectSASTLink() {
    const code_challenge = await useCodeChallenge();
    const redirect_uri = await getCurrentRedirectUri();
    const url = `https://link.sast.fun/auth?client_id=${process.env.LINK_CLIENT_ID}&code_challenge=${code_challenge}&code_challenge_method=S256&redirect_uri=${redirect_uri}&response_type=code&scope=all&state=xyz`
    console.log(url);
    return redirect(
        url
    );
}

export const get_user_access_token = async (code: string, code_verifier: string) => {
    const formData = new FormData();
    const redirect_uri = await getCurrentRedirectUri();
    formData.append("client_id", process.env.LINK_CLIENT_ID!);
    formData.append("client_secret", process.env.LINK_CLIENT_SECRET!);
    formData.append("code", code);
    formData.append("code_verifier", code_verifier);
    formData.append("grant_type", "authorization_code");
    formData.append("redirect_uri", redirect_uri);
    const res = await fetch("https://link.sast.fun/apis/oauth2/token", {
        method: "POST",
        body: formData,
    }).then((res) => res.json());
    console.log(res);
    const access_token = res?.Data?.access_token;
    if (!access_token) {
        throw new Error("get access token failed");
    }
    return access_token;
}

export const get_user_info = async (access_token: string) => {
    const res = await fetch("https://link.sast.fun/apis/oauth2/userinfo", {
        headers: {
            Authorization: `Bearer ${access_token}`,
        }
    }).then((res) => res.json());
    return res.Data;
}

function base64URLEncode(str: Buffer) {
    return str.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
  }

  function sha256(buffer: Buffer|string) {
    return crypto.createHash('sha256').update(buffer).digest();
  }

export async function useCodeChallenge() {
    const code_verifier = base64URLEncode(crypto.randomBytes(32));
    const cookieStore = cookies();
    const code_challenge = base64URLEncode(sha256(code_verifier));
    cookieStore.set("link_code_verifier", code_verifier);
    return code_challenge;
}

export const getCurrentRedirectUri = () => {
   return (process.env.NODE_ENV === "development"
            ? "http://localhost:3001"
            : "https://people.sast.fun") + "/api/auth/link/"

}