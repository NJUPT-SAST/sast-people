"use client";
import Script from "next/script";
import React from "react";

export const VConsole = () => {
	return (
		<>
			{process.env.NODE_ENV === "production" ? (
				<></>
			) : (
				<>
					<Script
						src="https://unpkg.com/vconsole@latest/dist/vconsole.min.js"
						strategy="beforeInteractive"
					></Script>
					<Script>var vConsole = new window.VConsole()</Script>
				</>
			)}
		</>
	);
};
