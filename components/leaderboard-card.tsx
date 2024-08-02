import { db } from "@/db/client";
import { Flame } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default async function LeaderboardCard({
	member,
}: {
	member: {
		id: string;
		name: string | null;
		updatedAt: Date | null;
		discordId: string | null;
		img: string | null;
		createdAt: Date | null;
	};
}) {
	if (!member) return null;
	if (!member.id) return null;

	const members = await db.query.tasks.findMany();
	// console.log(members);

	const memberInfo = members?.filter((m) => m.memberId! === member.id!);
	// console.log(memberInfo);

	const points: number = memberInfo?.reduce((acc, task) => {
		return acc + Number(task.points);
	}, 0);

	// 1. Sort memberInfo by completedAt in ascending order
	memberInfo.sort((a, b) => {
		if (!a.completedAt || !b.completedAt) return 0; // Handle potential nulls
		return a.completedAt.getTime() - b.completedAt.getTime();
	});

	// 2. Calculate the streak
	const streak = memberInfo.reduce((acc, task, index) => {
		if (index === 0) {
			// First task, start streak if completed
			return task.completed ? 1 : 0;
		}

		const prevTask = memberInfo[index - 1];

		// Check if the current task is completed and on the next consecutive day
		const isConsecutiveDay =
			task.completedAt &&
			prevTask.completedAt &&
			// Compare only the date parts (ignoring time)
			task.completedAt.toDateString() ===
				new Date(
					prevTask.completedAt.getTime() + 24 * 60 * 60 * 1000,
				).toDateString();

		if (task.completed && isConsecutiveDay) {
			return acc + 1; // Increment streak
		}
		// return 0; // Reset streak
		return acc;
	}, 0);

	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2 ">
				<Avatar>
					<AvatarImage src={member?.img || "/placeholder-user.jpg"} />
					<AvatarFallback className="uppercase">
						{member.name?.[0]}
					</AvatarFallback>
				</Avatar>
				<div>
					<div className="font-medium">{member.name}</div>
					<div className="text-sm text-muted-foreground">Most Points </div>
				</div>
			</div>
			<div className="text-2xl font-bold space-x-2 flex">
				<span>{points}</span>
				<span className="text-sm font-bold flex">
					<Flame className="w-4 h-4 text-red-700" />
					{streak}
				</span>
			</div>
		</div>
	);
}
