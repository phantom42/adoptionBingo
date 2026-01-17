import { Outlet } from "react-router-dom";
export default function Root(){
	return (
		<div className="flex items-center h-screen mx-auto bg-blue=500">
			<Outlet />
		</div>
	)
}