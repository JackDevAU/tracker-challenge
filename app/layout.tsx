import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Nunito } from "next/font/google";

import Navbar from "@/components/navbar";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

const fontHeading = Nunito({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-heading",
	weight: "700",
});

const fontBody = Nunito({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-body",
	weight: "400",
});

export const metadata: Metadata = {
	title: "MoonCowbs Fitness Checkin",
	description: "Just a quick and easy way to see who's doing the challenge",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={cn(
					"min-h-screen bg-background  antialiased",
					fontHeading.variable,
					fontBody.variable,
				)}
			>
				<ClerkProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<div className="container flex flex-col w-full min-h-screen bg-background mx-auto">
							<Navbar />
							{children}
						</div>
					</ThemeProvider>
				</ClerkProvider>
			</body>
		</html>
	);
}
