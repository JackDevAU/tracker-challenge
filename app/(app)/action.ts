"use server";

import { db } from "@/db/client";
import { members, tasks } from "@/db/schema";
import type { User } from "@clerk/backend";
import { revalidatePath } from "next/cache";

export type CreateMemberType = {
	img: string;
	discordId: string;
	name: string;
};

export const JoinChallenge = async (
	challengeId: string,
	user: CreateMemberType,
) => {
	console.log("Joining Challenge", challengeId, user);

	// Add the Member to the Challenge
	const member = await db
		.insert(members)
		.values({
			...user,
		})
		.returning()
		.execute();

	console.log("Created Member", member);
	revalidatePath("/");
	revalidatePath("/dashboard");
};

export type CheckInType = {
	challengeId: string;
	memberId: string;
	name: string;
	description: string;
	points: number;
	completed: boolean;
};
export const CheckIn = async (checkIn: CheckInType) => {
	// console.log("Checking In", checkIn);

	const today = new Date();
	// const yesterday = new Date(today);
	// yesterday.setDate(today.getDate() - 1);
	// const tomorrow = new Date(today);
	// tomorrow.setDate(today.getDate() + 1);

	await db
		.insert(tasks)
		.values({
			challengeId: checkIn.challengeId,
			memberId: checkIn.memberId,
			name: checkIn.name,
			description: `+ ${checkIn.points} ${checkIn.name}`,
			points: checkIn.points,
			completed: checkIn.completed,
			completedAt: today,
		})
		.execute();
	revalidatePath("/");
	revalidatePath("/dashboard");
};
