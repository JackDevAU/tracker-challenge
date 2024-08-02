"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { type CreateMemberType, JoinChallenge } from "./action";

export default function ClientPage({
	challengeId,
	particpants,
}: { challengeId: string; particpants: number }) {
	const { user } = useUser();
	const [loading, setLoading] = React.useState(false);

	if (!challengeId) {
		return null;
	}

	const externalInfo = user?.externalAccounts[0];

	const createMember: CreateMemberType = {
		img: externalInfo?.imageUrl || "",
		discordId: externalInfo?.providerUserId || "",
		name: externalInfo?.username || "",
	};

	return (
		<Button
			className="h-12 px-8 text-lg"
			disabled={loading}
			onClick={async () => {
				setLoading(true);
				await JoinChallenge(challengeId, createMember);
			}}
		>
			Join the {particpants} other{addOrRemoveS(particpants)}!
		</Button>
	);
}

const addOrRemoveS = (count: number) => (count === 1 ? "" : "s");
