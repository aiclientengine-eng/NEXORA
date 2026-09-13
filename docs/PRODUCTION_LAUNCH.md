# NEXORA production launch checklist

## Required hosting configuration

Deploy the repository to Vercel or another Node.js host using Node 20 and the production build command:

```bash
npm run db:generate && npm run build
```

## Required environment variables

Configure these values in the hosting provider, never in Git:

- `DATABASE_URL` — managed PostgreSQL connection string
- `DIRECT_URL` — direct PostgreSQL connection string when required by Prisma migrations
- `SESSION_SECRET` — long random secret, at least 32 bytes
- `NEXT_PUBLIC_APP_URL` — final HTTPS application URL
- `NODE_ENV=production`

Optional provider keys must be added only when the corresponding integration is implemented and tested.

## Database release steps

1. Create a managed PostgreSQL database.
2. Add `DATABASE_URL` and `DIRECT_URL` to the host.
3. Run `npm run db:generate`.
4. Run the reviewed Prisma migration against the production database.
5. Run the seed only if the seed is explicitly designed for production; never seed demo balances into production.

## Security gates before public launch

- Replace all demo market data with a verified provider.
- Configure rate limiting at the edge and API layer.
- Enable database backups and point-in-time recovery.
- Configure error monitoring and alerting.
- Verify email delivery and password-reset flows.
- Confirm cookie security, CSRF protection, and session expiration.
- Review every privileged route with RBAC tests.
- Complete legal, privacy, risk-disclosure, and financial-regulatory review.
- Do not enable live trading, custody, token sales, or financial promises without independent legal and security review.

## Current product boundary

NEXORA is not represented as audited, licensed, custody-enabled, or live-trading capable until those capabilities are independently implemented, tested, and approved. Demo data must remain visibly labeled.
