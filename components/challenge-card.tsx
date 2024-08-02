import React from "react";
import { Progress } from "./ui/progress";

export default function ChallengeCard() {
	return (
		<div className="flex items-center justify-between">
			<div>
				<div className="font-medium">Most steps taken</div>
				<div className="text-sm text-muted-foreground">
					Goal: 10,000 steps per day
				</div>
			</div>
			<Progress value={8500} max={10000} className="w-32" />
		</div>
	);
}
