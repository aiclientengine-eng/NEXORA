# NEXORA Architecture

## Current phase

NEXORA is in foundation development. The application currently contains a Next.js interface, a versioned health endpoint, a Prisma schema, market-data provider contracts, a safe demo provider, portfolio risk utilities, and an un-deployed NXR contract proposal.

## Boundaries

- `app/`: routes, pages, and API handlers
- `components/`: reusable presentation components
- `lib/`: domain utilities and infrastructure clients
- `prisma/`: normalized PostgreSQL schema and migrations
- `contracts/`: independently deployable Solidity contracts
- `docs/`: implementation and operational documentation

## Data modes

Production market data must come from a configured provider. When credentials are absent, the application uses an explicit demo mode. Demo values must never be represented as live financial data.

## Security boundaries

Private keys and seed phrases are never requested or stored. AI agents are designed around explicit permissions, allowlists, transaction limits, human approval, and emergency disable controls. Administrative actions require server-side authorization and audit logging.

## Delivery sequence

1. Foundation and provider interfaces
2. Database migrations and authentication/RBAC
3. Market, portfolio, and risk services
4. Wallet connectivity and transaction indexing
5. AI provider and structured analysis
6. Developer portal and API keys
7. Admin console and operational controls
8. Contract tests, testnet deployment, audit, and compliance review
