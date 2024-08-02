import { defineConfig } from "drizzle-kit";
export default defineConfig({
	dialect: "postgresql",
	schema: "./db/schema/index.ts",
	out: "./drizzle",
	strict: true,
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
});
