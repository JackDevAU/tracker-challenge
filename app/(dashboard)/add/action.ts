"use server";
import { db } from "@/db/client";
import { challenges } from "@/db/schema";
import { revalidatePath } from "next/cache";
import type { CreateChallengeFormType } from "./page";

export const CreateChallenge = async (formData: CreateChallengeFormType) => {
	try {
		await db
			.insert(challenges)
			.values({
				name: formData.name,
				startDate: formData.startDate,
				endDate: formData.endDate,
			})
			.execute();

		console.log("Challenge created successfully!");
		revalidatePath("/dashboard");
	} catch (error) {
		console.error("Error creating challenge:", error);
	}
};
