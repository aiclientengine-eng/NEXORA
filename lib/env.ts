import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_URL: z.string().url().optional(),
  SESSION_SECRET: z.string().min(32).optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  SESSION_SECRET: process.env.SESSION_SECRET,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});

export function assertProductionEnvironment() {
  if (env.NODE_ENV !== 'production') return;
  const required = ['DATABASE_URL', 'SESSION_SECRET', 'NEXT_PUBLIC_APP_URL'] as const;
  const missing = required.filter((key) => !env[key]);
  if (missing.length) throw new Error(`Missing production environment variables: ${missing.join(', ')}`);
}
