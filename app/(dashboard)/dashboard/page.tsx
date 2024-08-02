import LeaderboardCard from "@/components/leaderboard-card";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { db } from "@/db/client";

export default async function DashboardPage() {
	const members = await db.query.members.findMany();

	return (
		<div className="w-full justify-center">
			<main className="flex-1 justify-center gap-6 p-2 md:p-14 w-md ">
				<Card className="bg-card">
					<CardHeader>
						<CardTitle>Leaderboard</CardTitle>
						<CardDescription>Top Cowbs</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{members?.map((member) => (
							<LeaderboardCard key={member.id} member={member} />
						))}
						{members.length === 0 && (
							<div className="text-center text-muted-foreground">
								No contenders yet!
							</div>
						)}
					</CardContent>
				</Card>
			</main>
		</div>
	);
}
