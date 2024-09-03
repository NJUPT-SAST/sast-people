import { redirect } from "next/navigation";
import React from "react";
const Default: React.FC = async () => {
	return redirect("/dashboard");
};
export default Default;
