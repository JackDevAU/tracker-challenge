import type { TaskInfo } from "@/app/(app)/check-in-card";
import React from "react";
import { ScrollArea } from "./ui/scroll-area";

const dateFormat = (date: string) =>
	new Intl.DateTimeFormat("en-AU", {
		month: "long",
		day: "numeric",
	}).format(new Date(date));

export default function TaskHistory({
	memberInfo,
}: { memberInfo: TaskInfo[] }) {
	// console.log("MemberInfo", memberInfo);

	// 1. Sort memberInfo by completedAt in descending order
	memberInfo.sort((a, b) => {
		if (!a.completedAt || !b.completedAt) return 0; // Handle potential nulls
		return b.completedAt.getTime() - a.completedAt.getTime();
	});

	return (
		<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 items-center">
			<div className="grid gap-6 justify-items-center">
				<div className="flex flex-col items-start">
					<h1 className="text-xl">Your History</h1>
				</div>
				<div className="flex flex-col justify-items-start">
					<ScrollArea className="h-72 flex justify-items-start p-4">
						{memberInfo.map((member) => (
							<TaskItem key={member.id} task={member} />
						))}
					</ScrollArea>
				</div>
			</div>
		</div>
	);
}

const TaskItem = ({ task }: { task: TaskInfo }) => (
	<div className="flex items-baseline">
		<h2 className="text-lg font-semibold">{task.points}</h2>
		<p className="text-sm ml-2">
			Added on {dateFormat(task?.completedAt?.toString() || "")}
		</p>
	</div>
);
