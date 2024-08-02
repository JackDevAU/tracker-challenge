import JoinChallengeButton from "@/components/join-challenge-button";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { db } from "@/db/client";
import { selectChallengeSchema } from "@/db/db-types";
import { challenges, memberChallenges } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";
import postgres from "postgres";
import React from "react";
import ClientCheckInPage from "./client-page";

const dateFormat = (date: string) =>
	new Intl.DateTimeFormat("en-AU", {
		month: "long",
		day: "numeric",
	}).format(new Date(date));

export default async function ChallengePage() {
	const allChallenges = await db
		.select({
			id: challenges.id,
			name: challenges.name,
			startDate: challenges.startDate,
			endDate: challenges.endDate,
			participantCount: sql`COUNT(${memberChallenges.memberId})`,
		})
		.from(challenges)
		.leftJoin(memberChallenges, eq(memberChallenges.challengeId, challenges.id))
		.groupBy(challenges.id)
		.execute();

	return (
		<main className="flex-1 justify-items-center w-full  mx-auto  gap-6 p-6">
			<Card className="">
				<CardHeader>
					<CardTitle>Current Challenges</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					{allChallenges.map((challenge) => (
						<Card key={challenge.id} className="p-6 bg-muted rounded-lg">
							<CardHeader>
								<CardTitle>{challenge.name}</CardTitle>
								<CardDescription>
									{dateFormat(challenge.startDate!)} -{" "}
									{dateFormat(challenge.endDate!)}
								</CardDescription>
							</CardHeader>
							<CardContent className="flex flex-col gap-4">
								<div className="flex items-center justify-between">
									<span className="text-muted-foreground">Participants:</span>
									<span>{Number(challenge.participantCount)}</span>
								</div>
								<JoinChallengeButton challengeId={challenge.id} />
							</CardContent>
						</Card>
					))}
				</CardContent>
			</Card>
		</main>
	);
}
