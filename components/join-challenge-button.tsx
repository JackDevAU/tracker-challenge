import { db } from "@/db/client";
import { memberChallenges } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import React from "react";
import ClientJoinButton from "./client-join-button";

import { Card, CardContent, CardHeader } from "./ui/card";

type JoinChallengeButtonProps = {
	challengeId: number;
};
export default async function JoinChallengeButton({
	challengeId,
}: JoinChallengeButtonProps) {
	const { userId } = auth();

	const userInChallenge = await db
		.select()
		.from(memberChallenges)
		.where(
			and(
				eq(memberChallenges.memberId, userId ? userId.toString() : ""),
				eq(memberChallenges.challengeId, challengeId),
			),
		)

		.execute();

	console.log(userInChallenge);

	if (userInChallenge.length > 0) {
		return (
			<Card>
				<CardHeader>Check In</CardHeader>
				<CardContent>
					TODO: Add the form here to submit data for today!
				</CardContent>
			</Card>
		);
	}

	return <ClientJoinButton challengeId={challengeId} />;
}
