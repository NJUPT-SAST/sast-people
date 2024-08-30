import { PageTitle } from "@/components/route";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<>
			<div className="flex items-center h-10">
				<PageTitle />
			</div>
			<div
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
			</div>
		</>
	);
}
