import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/W7wms1JOL7T
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex flex-col w-full min-h-screen bg-background">
			<header className="flex items-center justify-between h-16 px-6 border-b bg-card">
				<div className="flex items-center gap-2 text-lg font-semibold">
					<DumbbellIcon className="w-6 h-6" />
					<span>Fitness Challenge</span>
				</div>
				<nav className="flex items-center gap-4">
					<Link
						href="#"
						className="text-sm font-medium hover:text-primary"
						prefetch={false}
					>
						Leaderboard
					</Link>
					<Link
						href="#"
						className="text-sm font-medium hover:text-primary"
						prefetch={false}
					>
						Challenges
					</Link>
					<Link
						href="#"
						className="text-sm font-medium hover:text-primary"
						prefetch={false}
					>
						Members
					</Link>
				</nav>
			</header>
			<main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
				<Card className="bg-card">
					<CardHeader>
						<CardTitle>Leaderboard</CardTitle>
						<CardDescription>Top performers in the group</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Avatar>
									<AvatarImage src="/placeholder-user.jpg" />
									<AvatarFallback>JD</AvatarFallback>
								</Avatar>
								<div>
									<div className="font-medium">John Doe</div>
									<div className="text-sm text-muted-foreground">
										Most steps taken
									</div>
								</div>
							</div>
							<div className="text-2xl font-bold">12,345</div>
						</div>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Avatar>
									<AvatarImage src="/placeholder-user.jpg" />
									<AvatarFallback>JA</AvatarFallback>
								</Avatar>
								<div>
									<div className="font-medium">Jane Appleseed</div>
									<div className="text-sm text-muted-foreground">
										Most workouts completed
									</div>
								</div>
							</div>
							<div className="text-2xl font-bold">42</div>
						</div>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Avatar>
									<AvatarImage src="/placeholder-user.jpg" />
									<AvatarFallback>SM</AvatarFallback>
								</Avatar>
								<div>
									<div className="font-medium">Sarah Miller</div>
									<div className="text-sm text-muted-foreground">
										Most weight lifted
									</div>
								</div>
							</div>
							<div className="text-2xl font-bold">750 lbs</div>
						</div>
					</CardContent>
				</Card>
				<Card className="bg-card">
					<CardHeader>
						<CardTitle>Challenges</CardTitle>
						<CardDescription>Track your progress</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<div>
								<div className="font-medium">Most steps taken</div>
								<div className="text-sm text-muted-foreground">
									Goal: 10,000 steps per day
								</div>
							</div>
							<Progress value={8500} max={10000} className="w-32" />
						</div>
						<div className="flex items-center justify-between">
							<div>
								<div className="font-medium">Most workouts completed</div>
								<div className="text-sm text-muted-foreground">
									Goal: 4 workouts per week
								</div>
							</div>
							<Progress value={3} max={4} className="w-32" />
						</div>
						<div className="flex items-center justify-between">
							<div>
								<div className="font-medium">Most weight lifted</div>
								<div className="text-sm text-muted-foreground">
									Goal: 800 lbs per week
								</div>
							</div>
							<Progress value={650} max={800} className="w-32" />
						</div>
					</CardContent>
				</Card>
				<Card className="bg-card">
					<CardHeader>
						<CardTitle>Members</CardTitle>
						<CardDescription>Group participants</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Avatar>
									<AvatarImage src="/placeholder-user.jpg" />
									<AvatarFallback>JD</AvatarFallback>
								</Avatar>
								<div>
									<div className="font-medium">John Doe</div>
									<div className="text-sm text-muted-foreground">
										Joined 2 weeks ago
									</div>
								</div>
							</div>
							<Button variant="ghost" size="icon">
								<MoveHorizontalIcon className="w-4 h-4" />
								<span className="sr-only">More options</span>
							</Button>
						</div>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Avatar>
									<AvatarImage src="/placeholder-user.jpg" />
									<AvatarFallback>JA</AvatarFallback>
								</Avatar>
								<div>
									<div className="font-medium">Jane Appleseed</div>
									<div className="text-sm text-muted-foreground">
										Joined 1 month ago
									</div>
								</div>
							</div>
							<Button variant="ghost" size="icon">
								<MoveHorizontalIcon className="w-4 h-4" />
								<span className="sr-only">More options</span>
							</Button>
						</div>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<Avatar>
									<AvatarImage src="/placeholder-user.jpg" />
									<AvatarFallback>SM</AvatarFallback>
								</Avatar>
								<div>
									<div className="font-medium">Sarah Miller</div>
									<div className="text-sm text-muted-foreground">
										Joined 3 months ago
									</div>
								</div>
							</div>
							<Button variant="ghost" size="icon">
								<MoveHorizontalIcon className="w-4 h-4" />
								<span className="sr-only">More options</span>
							</Button>
						</div>
					</CardContent>
				</Card>
			</main>
		</div>
	);
}

function DumbbellIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M14.4 14.4 9.6 9.6" />
			<path d="M18.657 21.485a2 2 0 1 1-2.829-2.828l-1.767 1.768a2 2 0 1 1-2.829-2.829l6.364-6.364a2 2 0 1 1 2.829 2.829l-1.768 1.767a2 2 0 1 1 2.828 2.829z" />
			<path d="m21.5 21.5-1.4-1.4" />
			<path d="M3.9 3.9 2.5 2.5" />
			<path d="M6.404 12.768a2 2 0 1 1-2.829-2.829l1.768-1.767a2 2 0 1 1-2.828-2.829l2.828-2.828a2 2 0 1 1 2.829 2.828l1.767-1.768a2 2 0 1 1 2.829 2.829z" />
		</svg>
	);
}

function MoveHorizontalIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<polyline points="18 8 22 12 18 16" />
			<polyline points="6 8 2 12 6 16" />
			<line x1="2" x2="22" y1="12" y2="12" />
		</svg>
	);
}

function XIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M18 6 6 18" />
			<path d="m6 6 12 12" />
		</svg>
	);
}
