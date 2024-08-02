"use server";

import { db } from "@/db/client";
import { memberChallenges, members } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

export const JoinChallenge = async (challengeId: number) => {
	const { userId } = auth();

	// 1. Basic Validation
	if (!userId) {
		throw new Error("User not authenticated. Please log in.");
	}

	if (!challengeId || typeof challengeId !== "number") {
		throw new Error("Invalid challenge ID provided.");
	}

	try {
		// 2. Check if the user has already joined this challenge
		const existingMembership = await db
			.select()
			.from(memberChallenges)
			.where(
				and(
					eq(memberChallenges.challengeId, challengeId),
					eq(memberChallenges.memberId, userId),
				),
			)
			.execute();

		if (existingMembership.length > 0) {
			throw new Error("User has already joined this challenge.");
		}

		// 3. Fetch the user's details from Clerk
		const user = await clerkClient.users.getUser(userId);

		// 4. Check if the member already exists in the database
		let memberId = userId; // Assume Clerk userId is the memberId initially
		const existingMember = await db
			.select()
			.from(members)
			.where(eq(members.id, userId))
			.execute();

		if (existingMember.length === 0) {
			// 5. If the member doesn't exist, create a new member record
			const newMember = await db
				.insert(members)
				.values({
					id: userId,
					name: user.firstName || "", // Use first name or provide a default
					img: user.imageUrl || "", // Use profile image or provide a default
					createdAt: new Date(),
					updatedAt: new Date(),
				})
				.returning();
			memberId = newMember[0].id; // Get the ID of the newly created member
		}

		// 6. Insert the new member-challenge association into the database
		await db
			.insert(memberChallenges)
			.values({
				memberId,
				challengeId: challengeId,
				createdAt: new Date(),
				updatedAt: new Date(),
			})
			.execute();

		console.log("User joined challenge successfully!");
		// Optionally, you can return a success message or redirect the user
	} catch (error) {
		console.error("Error joining challenge:", error);
		throw error; // Re-throw the error to allow the frontend to handle it
	}
};
