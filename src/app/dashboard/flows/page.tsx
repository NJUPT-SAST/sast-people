import { PageTitle } from "@/app/components/route";
import { Button } from "@/app/components/ui/button";
import React from "react";

const Flows = () => {
	return (
		<>
			<div className="flex items-center justify-between">
				<PageTitle />
                <Button size="sm">提交报名</Button>
			</div>
			<div></div>
		</>
	);
};

export default Flows;
