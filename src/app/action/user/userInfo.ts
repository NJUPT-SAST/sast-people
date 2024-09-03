import { basicInfoSchema } from "@/app/components/userInfo/basic";
import { z } from "zod";

export async function editBasicInfo(values: z.infer<typeof basicInfoSchema>) {
	console.log(values);
}
