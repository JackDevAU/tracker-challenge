import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import {
	challenges,
	dailyTargets,
	exercises,
	intensities,
	memberChallenges,
	members,
} from "./schema";

// Inserts
export const insertMemberSchema = createInsertSchema(members);
export const insertChallengeSchema = createInsertSchema(challenges);
export const insertExerciseSchema = createInsertSchema(exercises);
export const insertIntensitySchema = createInsertSchema(intensities);
export const insertMemberChallengeSchema = createInsertSchema(memberChallenges);
export const insertDailyTargetsSchema = createInsertSchema(dailyTargets);

// Selects
export const selectMemberSchema = createSelectSchema(members);
export const selectChallengeSchema = createSelectSchema(challenges);
export const selectExerciseSchema = createSelectSchema(exercises);
export const selectIntensitySchema = createSelectSchema(intensities);
export const selectMemberChallengeSchema = createSelectSchema(memberChallenges);
export const selectDailyTargetsSchema = createSelectSchema(dailyTargets);
