"use client";

import { useUser } from "@clerk/nextjs";
import type { PropsWithChildren } from "react";

type ClientCheckInPageProps = {};

export default function ClientCheckInPage(props: ClientCheckInPageProps) {
	const { isLoaded, user } = useUser();

	if (!isLoaded) {
		return <div className="flex loader justify-center w-full" />;
	}

	return <>Hello</>;
}
