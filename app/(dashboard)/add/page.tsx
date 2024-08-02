"use client";
import AutoForm, { AutoFormSubmit } from "@/components/auto-form";
import React from "react";
import { z } from "zod";
import { CreateChallenge } from "./action";

const formSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	startDate: z
		.date({
			required_error: "A start date is required.",
		})
		.min(new Date(-1), { message: "Date must be in the future" }),
	endDate: z
		.date({
			required_error: "An end date is required.",
		})
		.min(new Date(), { message: "Date must be in the future" }),
});

export type CreateChallengeFormType = z.infer<typeof formSchema>;

export default function CreateChallengePage() {
	return (
		<main className="p-6">
			<AutoForm
				formSchema={formSchema}
				onSubmit={async (values) => await CreateChallenge(values)}
			>
				<AutoFormSubmit>Create</AutoFormSubmit>
			</AutoForm>
		</main>
	);
}
