import { PageTitle } from "@/components/route";
import { Button } from "@/components/ui/button";
import React from "react";
import QRCodeScanner from "@/components/qrcodeScanner";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
  } from "@/components/ui/select"
  

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
							<Select>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="请选择试卷" />
								</SelectTrigger>
								<SelectContent>
									{options.map(option => (
										<SelectItem key={option} value={option}>
											{option.charAt(0).toUpperCase() + option.slice(1)}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</SheetContent>
					</Sheet>					
			</div>
			<QRCodeScanner />
			<div></div>
		</>
	);
};

export default Review;
