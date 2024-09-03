import { PageTitle } from "@/app/components/route";
import { Button } from "@/app/components/ui/button";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/app/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/app/components/ui/form";
import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { user } from "@/db/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BasicInfo } from "@/app/components/userInfo/basic";
import { ExperienceInfo } from "@/app/components/userInfo/experience";

export default function Home() {
	return (
		<>
			<div className="flex items-center h-10">
				<PageTitle />
			</div>
			{/* <div
				className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
				x-chunk="dashboard-02-chunk-1"
			>
				<div className="flex flex-col items-center gap-1 text-center">
					<h3 className="text-2xl font-bold tracking-tight">
						Welcome to SAST Pass
					</h3>
					<p className="text-sm text-muted-foreground">
						看起来是新同学呢，在报名之前介绍一下你自己吧！
					</p>
					<Button className="mt-4">开始编辑资料</Button>
				</div>
			</div> */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
				<BasicInfo />
				<ExperienceInfo />
			</div>
		</>
	);
}
