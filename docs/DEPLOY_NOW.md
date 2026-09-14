# NEXORA deployment

## 1. Import into Vercel

1. Open Vercel.
2. Import `aiclientengine-eng/NEXORA`.
3. Select the `main` branch.
4. Keep the Next.js framework preset.

## 2. Configure production environment variables

```env
NODE_ENV=production
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/nexora?sslmode=require
SESSION_SECRET=generate-a-long-random-secret-at-least-32-characters
NEXT_PUBLIC_APP_URL=https://your-domain.example
```

Never commit real secrets to GitHub.

## 3. Provision PostgreSQL

Use a managed PostgreSQL provider. Run the following from a trusted deployment shell or Vercel build environment:

```bash
npm ci
npx prisma generate
npx prisma migrate deploy
```

If no migration directory exists yet, do not use `prisma migrate deploy` as a substitute for reviewing the schema. Create and review the first migration in a controlled environment, then deploy it.

## 4. Verify deployment

- `GET /api/v1/health` must return `200`.
- `GET /api/v1/health/ready` must return `200` and report `database: connected`.
- `/login`, `/register`, `/terminal`, `/dashboard`, and `/wallets` must load.
- Confirm cookies are secure in production.
- Confirm no demo data is presented as live market data.

## 5. Before enabling financial functionality

Complete independent security review, dependency scanning, database backups, alerting, rate limiting, provider agreements, privacy policy, terms of service, and jurisdiction-specific financial/regulatory review. Do not enable custody, token sales, withdrawals, or live trading until those controls are complete.
