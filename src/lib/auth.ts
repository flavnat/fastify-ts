import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "../db/schema.js";
import { db } from '../plugins/db.js';
import { env } from "../config/env.js";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "sqlite",
        schema: schema,
    }),
    emailAndPassword: {
        enabled: true
    },
    logger: {
        level: "debug",
    },
    baseURL: env.BETTER_AUTH_URL,
    advanced: {
        disableCSRFCheck: true
    }
});