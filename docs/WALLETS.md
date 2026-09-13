# NEXORA wallet integration

## Current capability

- Browser-based EIP-1193 provider detection
- Explicit account connection through `eth_requestAccounts`
- EVM chain ID discovery
- Native balance discovery through `eth_getBalance`
- Local session disconnect control
- No private-key handling or custody

## Route

Open `/wallets` in the NEXORA web application.

## Security boundaries

The current adapter only reads public wallet information. It does not sign transactions, request token approvals, switch networks, or persist wallet addresses. Those capabilities require a reviewed permission model, audit logging, chain allowlists, and production RPC/indexing infrastructure before launch.

## Next implementation

1. Persist verified public wallet records against authenticated users.
2. Add chain allowlists and human-readable network names.
3. Add token balance indexing through a replaceable provider interface.
4. Add transaction history with pagination and rate limits.
5. Add explicit transaction simulation and confirmation screens before any signing feature.
