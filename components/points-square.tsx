/**
 * v0 by Vercel.
 * @see https://v0.dev/t/pKC5m1FlnU6
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import React from "react";

const colors = {
	0: "bg-background",
	25: "bg-green-800",
	50: "bg-green-600",
	75: "bg-green-400",
	100: "bg-green-300",
};
type Colors = keyof typeof colors;

const TrackDayTask = (color: Colors) => (
	<div className={`w-3 h-3 rounded-full ${color}`} />
);

export default function PointsSquare({
	memberInfo,
	challenge,
}: {
	memberInfo: TaskInfo[];
	challenge: Challenge;
}) {
	// Check if challenge data is available
	if (!challenge?.startDate || !challenge?.endDate) return null;

	const challengeStartDate = challenge.startDate;
	const challengeEndDate = challenge.endDate;

	// Today's date
	const today = new Date();

	// Calculate the number of days in the challenge
	const totalChallengeDays = Math.ceil(
		(challengeEndDate.getTime() - challengeStartDate.getTime()) /
			(1000 * 3600 * 24) +
			1,
	);

	// Generate an array to represent each day of the challenge
	const challengeDays = Array.from(
		{ length: totalChallengeDays },
		(_, index) => {
			const date = new Date(challengeStartDate);
			date.setDate(challengeStartDate.getDate() + index);
			return date;
		},
	);

	// Get the day of the week for the challenge start date (0 = Sunday, 1 = Monday, etc.)
	const startDayOfWeek = challengeStartDate.getDay();

	// 1. Sort memberInfo by completedAt in descending order
	memberInfo.sort((a, b) => {
		if (!a.completedAt || !b.completedAt) return 0; // Handle potential nulls
		return b.completedAt.getTime() - a.completedAt.getTime(); // Descending order
	});

	// 2. Group tasks by date and sum their points
	const totalDailyPoints = memberInfo.reduce(
		(acc, task) => {
			const dateKey = task.completedAt?.toDateString(); // Use date as the key

			if (!dateKey) return acc; // Skip tasks without a valid date

			if (!acc[dateKey]) {
				acc[dateKey] = 0; // Initialize if it's the first task for this date
			}

			acc[dateKey] += task.points || 0; // Add points (handle potential null)
			return acc;
		},
		{} as Record<string, number>,
	);

	// 3. Convert the object to an array for easier use
	const totalDailyPointsArray = Object.entries(totalDailyPoints).map(
		([date, points]) => ({ date: new Date(date), points }),
	);

	// Calculate the total number of squares needed (including empty ones at the end)
	const totalSquares = Math.ceil((totalChallengeDays + startDayOfWeek) / 7) * 7;

	// Create an array to hold all squares (contribution data + empty squares)
	const allSquaresData = challengeDays.map((date) => {
		const matchingPointEntry = totalDailyPointsArray.find(
			(entry) => entry.date.toDateString() === date.toDateString(),
		);
		return matchingPointEntry ? matchingPointEntry.points : 0;
	});

	while (allSquaresData.length < totalSquares) {
		allSquaresData.push(0); // Add 0 for empty squares at the end
	}

	return (
		<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 items-center">
			<div className="grid gap-6 justify-items-center">
				<div className="flex flex-col items-start">
					<h1 className="text-3xl font-bold">Your Activity</h1>
					<p className="text-muted-foreground">Look at the pretty colours!</p>
				</div>

				{/* Days of the week header - Shifted to align with the grid */}
				<div className="flex flex-wrap w-[220px] gap-2 text-sm font-medium">
					{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
						.slice(startDayOfWeek) // Start from the challenge's start day
						.concat(
							["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].slice(
								0,
								startDayOfWeek,
							),
						) // Add remaining days to the end
						.map((day) => (
							<div key={day} className="text-muted-foreground">
								{day}
							</div>
						))}
				</div>

				{/* Contribution squares */}
				<div className="flex flex-wrap w-[220px] gap-2">
					{allSquaresData.map((contribution, index) => {
						// Determine the color based on the contribution
						const colorKey =
							contribution >= 100
								? 100
								: contribution >= 75
									? 75
									: contribution >= 50
										? 50
										: contribution >= 25
											? 25
											: 0;
						const color = colors[colorKey as Colors];

						// Get the corresponding date for this square (or null if it's an empty square)
						const date =
							index < totalChallengeDays ? challengeDays[index] : null;

						// Check if the date is today
						const isToday =
							date && date.toDateString() === today.toDateString();

						return (
							<div
								key={index} // Use index as key for empty squares
								className={`w-6 h-6 rounded ${color} ${
									isToday ? "ring-2 ring-offset-2 ring-blue-500" : ""
								}`}
								title={
									date
										? `${contribution} contribution${contribution !== 1 ? "s" : ""}`
										: "No contribution"
								}
							>
								<TrackDayTask color={color as Colors} />
							</div>
						);
					})}
				</div>

				{/* Legend */}
				<div className="flex items-center gap-2 flex-wrap">
					<div className="w-3 h-3 rounded-full bg-background" />
					<div className="text-sm text-muted-foreground">0</div>
					<div className="w-3 h-3 rounded-full bg-green-800" />
					<div className="text-sm text-muted-foreground">25</div>
					<div className="w-3 h-3 rounded-full bg-green-600" />
					<div className="text-sm text-muted-foreground">50</div>
					<div className="w-3 h-3 rounded-full bg-green-400" />
					<div className="text-sm text-muted-foreground">75</div>
					<div className="w-3 h-3 rounded-full bg-green-300" />
					<div className="text-sm text-muted-foreground">100+</div>
				</div>
			</div>
		</div>
	);
}
