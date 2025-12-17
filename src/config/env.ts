import "dotenv/config";
import z from "zod";

export const env = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]),
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.string().optional(),
}).parse(process.env)