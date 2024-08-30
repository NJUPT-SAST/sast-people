"use client";

import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import {
	UserPen,
	Workflow,
	FilePenLine,
	Users,
	SquareChartGantt,
	Menu,
	TicketsPlane,
	HomeIcon,
	ShoppingCart,
	Package,
	LineChart,
} from "lucide-react";
import { Button } from "./ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "./ui/card";
import Link from "next/link";
import { createElement } from "react";

const menuItems = [
	{
		title: "我的资料",
		icon: UserPen,
		path: "/",
	},
	{
		title: "我的流程",
		icon: Workflow,
		path: "/flows",
	},
	{
		title: "试卷批改",
		icon: FilePenLine,
		path: "/review",
	},
	{
		title: "招新管理",
		icon: Users,
		path: "/manage",
	},
	{
		title: "流程类别管理",
		icon: SquareChartGantt,
		path: "/flow-types",
	},
];

export const Header = ({ type }: { type: "pc" | "mobile" }) => {
	const pathname = usePathname();
	switch (type) {
		case "pc":
			return (
				<div className="flex-1">
					<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
						{menuItems.map((item, index) => (
							<Link
								key={item.title}
								href={item.path}
								className={
									pathname === item.path
										? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
										: "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
								}
							>
								{createElement(item.icon, {
									className: "h-4 w-4",
								})}
								{item.title}
							</Link>
						))}
					</nav>
				</div>
			);
		case "mobile":
			return (
				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant="outline"
							size="icon"
							className="shrink-0 md:hidden"
						>
							<Menu className="h-5 w-5" />
							<span className="sr-only">点击打开菜单</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left" className="flex flex-col">
						<nav className="grid gap-2 text-lg font-medium">
							<Link
								href="#"
								className="flex items-center gap-2 text-lg font-semibold"
							>
								<TicketsPlane className="h-6 w-6" />
								<span className="sr-only">
									SAST Pass 招新系统
								</span>
							</Link>
							{menuItems.map((item, index) => (
								<Link
									key={item.title}
									href={item.path}
									className={
										pathname === item.path
											? "mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
											: "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
									}
								>
									{createElement(item.icon, {
										className: "h-5 w-5",
									})}
									{item.title}
								</Link>
							))}
						</nav>
						<div className="mt-auto">
							<Card>
								<CardHeader>
									<CardTitle>Maxtune</CardTitle>
									<CardDescription>
										新同学，你好😸️！
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Button
										size="sm"
										className="w-full"
										variant={"outline"}
									>
										退出登录
									</Button>
								</CardContent>
							</Card>
						</div>
					</SheetContent>
				</Sheet>
			);
	}
};

export const PageTitle = () => {
	const pathname = usePathname();
	return (
		<h1 className="text-lg font-semibold md:text-2xl">
			{menuItems.find((item) => item.path === pathname)?.title}
		</h1>
	);
};
