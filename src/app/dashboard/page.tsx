import { PageTitle } from "@/components/route";
import { BasicInfo } from "@/components/userInfo/basic";
import { ExperienceInfo } from "@/components/userInfo/experience";
import { useUserInfo } from "../../hooks/useUserInfo";
import { useCollegeList } from "../../hooks/useCollegeList";
import dayjs from "@/lib/dayjs";
import { ShowQrCode } from "@/components/userInfo/showQrCode";

export default async function Home() {
	const userInfo = await useUserInfo();
	const collegeList = await useCollegeList();

	return (
		<>
			<div className="flex justify-between">
				<div className="flex justify-center h-10 flex-col">
					<PageTitle />
					<div className="text-sm text-muted-foreground">
						上次更新时间：
						{userInfo.updatedAt &&
							dayjs().calendar(dayjs(userInfo.updatedAt))}
					</div>
				</div>
				<div className="flex items-center">
					<ShowQrCode uid={userInfo.id.toString()} />
				</div>
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
				<BasicInfo initialInfo={userInfo} collegeList={collegeList} />
				<ExperienceInfo initialInfo={userInfo} />
			</div>
		</>
	);
}
