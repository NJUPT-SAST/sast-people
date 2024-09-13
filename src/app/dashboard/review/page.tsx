import { PageTitle } from "@/components/route";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import QRCodeScanner from "@/components/qrcodeScanner";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";


const Review: React.FC = () => {

	return (
		<>
			<div className="flex items-center justify-between">
				<PageTitle />
					<Sheet >
						<SheetTrigger asChild>
							<Button size="sm">设置阅卷范围</Button>
						</SheetTrigger>		
						<SheetContent>
							<SheetHeader className="text-2xl font-semibold">
								设置阅卷范围
							</SheetHeader>
						</SheetContent>
					</Sheet>					
			</div>
			<QRCodeScanner />
			<div></div>
		</>
	);
};

export default Review;
