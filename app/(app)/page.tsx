import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db/client";
import { auth, clerkClient } from "@clerk/nextjs/server";
import React from "react";
import CheckInCard from "./check-in-card";
import ClientPage from "./client-page";

const dateFormat = (date: string) =>
	new Intl.DateTimeFormat("en-AU", {
		month: "long",
		day: "numeric",
	}).format(new Date(date));

export default async function HomePage() {
	const { userId } = auth();

	const challenge = await db.query.challenges.findFirst();

	if (!userId) return null;

	const user = await clerkClient.users.getUser(userId);
	if (!user || !user.externalAccounts || user.externalAccounts.length === 0) {
		throw new Error("User external accounts not found");
	}

	const discordId = user.externalAccounts[0].externalId;
	if (!discordId) throw new Error("Discord ID not found");

	const members = await db.query.members.findMany();

	const isMember = members.find((member) => member.discordId === discordId);

	const tasks = await db.query.tasks.findMany();

	const memberTasks = tasks?.filter((m) => m.memberId! === isMember?.id);
	console.log(memberTasks);

	return (
		<main className="w-full justify-center">
			<div className="flex-1 justify-center gap-6 p-2 md:p-14 w-md">
				<Card className=" ">
					<CardHeader>
						<CardTitle>{challenge?.name}</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div>
							{dateFormat(challenge?.startDate?.toString() || "")} -{" "}
							{dateFormat(challenge?.endDate?.toString() || "")}
						</div>
						{isMember ? (
							<CheckInCard
								challengeId={challenge?.id || ""}
								memberId={isMember.id}
								memberInfo={memberTasks}
								challenge={challenge}
							/>
						) : (
							<ClientPage
								challengeId={challenge?.id || ""}
								particpants={members.length}
							/>
						)}
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
