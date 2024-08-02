import {
	boolean,
	integer,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";

export const challenges = pgTable("challenges", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: text("name"),
	startDate: timestamp("start_date"),
	endDate: timestamp("end_date"),
	updatedAt: timestamp("updated_at").default(new Date()),
});

export const members = pgTable("members", {
	id: uuid("id").defaultRandom().primaryKey(),
	discordId: text("discord_id").unique(),
	name: text("name"),
	img: text("img"),
	createdAt: timestamp("created_at").default(new Date()),
	updatedAt: timestamp("updated_at").default(new Date()),
});

export const tasks = pgTable("tasks", {
	id: uuid("id").defaultRandom().primaryKey(),
	challengeId: uuid("challenge_id").references(() => challenges.id),
	memberId: uuid("member_id").references(() => members.id),
	name: text("name"),
	description: text("description"),
	date: timestamp("date").default(new Date()),
	points: integer("points").default(0),
	completed: boolean("completed").default(false),
	completedAt: timestamp("updated_at").default(new Date()),
});
