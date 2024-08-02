import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { DumbbellIcon } from "./icons";

export default function Navbar() {
	return (
		<header className="flex items-center justify-between h-16 px-6 py-4 mt-12 border-b bg-card ">
			<div className="flex items-center gap-2 text-xl font-extrabold">
				<DumbbellIcon className="w-6 h-6" />
				<span className="hidden md:flex">Fitness Challenge</span>
			</div>
			<div className="flex items-center gap-4">
				<Link
					href="/dashboard"
					className="text-lg font-medium hover:border-b-text-primary hover:border-b-2"
					prefetch={false}
				>
					Leaderboard
				</Link>
				<Link
					href="/"
					className="text-lg font-medium hover:border-b-text-primary hover:border-b-2"
					prefetch={false}
				>
					Check In ✨
				</Link>
			</div>
			<nav className="flex items-center gap-4">
				<div>
					<SignedOut>
						<SignInButton />
					</SignedOut>
					<SignedIn>
						<UserButton />
					</SignedIn>
				</div>
			</nav>
		</header>
	);
}
