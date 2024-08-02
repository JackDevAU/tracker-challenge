"use client";
import CheckInSelector from "@/components/checkin-selector";
import PointsSquare from "@/components/points-square";
import TaskHistory from "@/components/task-history";
import { useUser } from "@clerk/nextjs";
import React from "react";

export type TaskInfo = {
	date: Date | null;
	id: string;
	name: string | null;
	challengeId: string | null;
	memberId: string | null;
	description: string | null;
	points: number | null;
	completed: boolean | null;
	completedAt: Date | null;
};

export type Challenge =
	| {
			id: string;
			name: string | null;
			startDate: Date | null;
			endDate: Date | null;
			updatedAt: Date | null;
	  }
	| undefined;

export default function CheckInCard({
	challengeId,
	memberId,
	memberInfo,
	challenge,
}: {
	challengeId: string;
	memberId: string;
	memberInfo: TaskInfo[];
	challenge: Challenge;
}) {
	const { user } = useUser();

	if (!challengeId || !memberId) {
		return null;
	}

	const externalInfo = user?.externalAccounts[0];

	return (
		<>
			<CheckInSelector challengeId={challengeId} memberId={memberId} />

			<div className="grid md:grid-cols-2">
				<TaskHistory memberInfo={memberInfo} />
				<PointsSquare memberInfo={memberInfo} challenge={challenge} />
			</div>
		</>
	);
}
