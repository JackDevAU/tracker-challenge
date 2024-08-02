"use client";
import { CheckIn, type CheckInType } from "@/app/(app)/action";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import confetti from "canvas-confetti";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

type CheckInSelectorProps = {
	memberId: string;
	challengeId: string;
};
// CheckInSelector component
export default function CheckInSelector({
	memberId,
	challengeId,
}: CheckInSelectorProps) {
	const [count, setCount] = useState(25);
	const [selected, setSelected] = useState("situps");

	const increment = () => {
		setCount((prev) => {
			const nextValue = prev + 25;
			return nextValue <= 100 ? nextValue : prev; // Cap at 100
		});
	};

	const decrement = () => {
		setCount((prev) => (prev >= 50 ? prev - 25 : prev)); // Minimum 25
	};

	return (
		<div className="flex flex-col gap-4 items-center justify-center">
			<div className="flex items-center justify-center space-x-4">
				<Button onClick={decrement} variant="ghost">
					<Minus />
				</Button>
				<span className="text-3xl font-semibold">{count}</span>
				<Button onClick={increment} variant="ghost">
					<Plus />
				</Button>
				<SubmitScoreCheckbox
					score={count}
					memberId={memberId}
					challengeId={challengeId}
					selected={selected}
				/>{" "}
			</div>
			<Select value={selected} onValueChange={setSelected}>
				<SelectTrigger className="w-[180px]">
					<SelectValue defaultValue="situps" placeholder="Situps" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="situps">Situps</SelectItem>
					<SelectItem value="pushups">Pushups</SelectItem>
					<SelectItem value="squats">Squats</SelectItem>
				</SelectContent>
			</Select>
		</div>
	);
}

// SubmitScoreCheckbox component
function SubmitScoreCheckbox({
	selected,
	score,
	memberId,
	challengeId,
}: { score: number; selected: string } & CheckInSelectorProps) {
	const handleSubmit = async () => {
		handleClick();

		// Prepare data for CheckIn action
		const checkInData: CheckInType = {
			challengeId: challengeId || "",
			memberId: memberId || "",
			name: selected,
			description: "",
			points: score,
			completed: true,
		};

		try {
			await CheckIn(checkInData); // Call the server action
		} catch (error) {
			console.error("Error checking in:", error);
			// Handle error (e.g., show an error message to the user)
		}
	};

	const handleClick = () => {
		const scalar = 2;
		const strong = confetti.shapeFromText({ text: "💪", scalar });
		const star = confetti.shapeFromText({ text: "⭐", scalar });

		const defaults = {
			spread: 360,
			ticks: 60,
			gravity: 0,
			decay: 0.96,
			startVelocity: 20,
			shapes: [strong, star],
			scalar,
		};

		const shoot = () => {
			confetti({
				...defaults,
				particleCount: 30,
			});

			confetti({
				...defaults,
				particleCount: 5,
			});

			confetti({
				...defaults,
				particleCount: 15,
				scalar: scalar / 2,
				shapes: ["circle"],
			});
		};

		setTimeout(shoot, 0);
		setTimeout(shoot, 100);
		setTimeout(shoot, 200);
	};

	return (
		<div>
			<Checkbox
				className="h-12 w-12 "
				onCheckedChange={async (checked) => {
					if (checked) await handleSubmit();
				}}
			/>
		</div>
	);
}
