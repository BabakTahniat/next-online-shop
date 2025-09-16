import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';
const myenv = dotenv.config({ path: './.env.local' });

export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
