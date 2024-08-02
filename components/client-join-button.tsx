"use client";

import { JoinChallenge } from "@/app/action";
import { Button } from "./ui/button";

export default function ClientJoinButton({
	challengeId,
}: { challengeId: number }) {
	return (
		<Button
			variant="primary"
			onClick={async () => await JoinChallenge(challengeId)}
		>
			Join Challenge
		</Button>
	);
}
