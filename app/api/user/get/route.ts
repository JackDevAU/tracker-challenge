import { db } from "@/db/client";
import { memberChallenges } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

export const GET = async (req: Request) => {
	const { userId } = auth();

	if (!userId) {
		return Response.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		// Check if the user is in any challenges
		const userChallenges = await db
			.select()
			.from(memberChallenges)
			.where(and(eq(memberChallenges.memberId, userId)))
			.execute();

		const userInChallenge = userChallenges.length > 0;

		return Response.json({ userInChallenge }); // Return boolean value
	} catch (error) {
		console.error("Error checking if user is in challenge:", error);
		return Response.json({ error: "Internal server error" }, { status: 500 });
	}
};
