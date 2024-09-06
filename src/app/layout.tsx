import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "SAST 招新",
	description: "南京邮电大学大学生科学技术协会招新平台",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="zh-cn">
			<body className={inter.className}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
