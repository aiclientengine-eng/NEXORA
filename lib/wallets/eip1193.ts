import type { ConnectedWallet, WalletBalance, WalletProviderAdapter } from './types';

export interface Eip1193Provider {
  request(args: { method: string; params?: unknown[] }): Promise<unknown>;
}

function normalizeChainId(value: unknown): number {
  if (typeof value !== 'string') return 0;
  return Number.parseInt(value, 16);
}

export function isEvmAddress(value: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(value);
}

export class Eip1193WalletAdapter implements WalletProviderAdapter {
  private readonly provider: Eip1193Provider;
  private connectedAddress: string | null = null;
  private connectedChainId = 0;

  constructor(provider: Eip1193Provider) {
    this.provider = provider;
  }

  async connect(): Promise<ConnectedWallet> {
    const accounts = await this.provider.request({ method: 'eth_requestAccounts' });
    const address = Array.isArray(accounts) && typeof accounts[0] === 'string' ? accounts[0] : '';
    if (!isEvmAddress(address)) throw new Error('The wallet did not return a valid EVM address.');

    const chainId = normalizeChainId(await this.provider.request({ method: 'eth_chainId' }));
    this.connectedAddress = address;
    this.connectedChainId = chainId;

    return {
      address,
      chainId,
      provider: 'injected',
      connectedAt: new Date().toISOString(),
    };
  }

  async disconnect(): Promise<void> {
    this.connectedAddress = null;
    this.connectedChainId = 0;
  }

  async getBalance(address: string): Promise<WalletBalance> {
    if (!isEvmAddress(address)) throw new Error('Invalid EVM address.');
    const nativeBalance = await this.provider.request({
      method: 'eth_getBalance',
      params: [address, 'latest'],
    });

    return {
      address,
      chainId: this.connectedChainId,
      nativeBalance: typeof nativeBalance === 'string' ? nativeBalance : '0x0',
      tokenBalances: [],
    };
  }

  getAddress(): string | null {
    return this.connectedAddress;
  }
}

export function getInjectedProvider(): Eip1193Provider | null {
  if (typeof window === 'undefined') return null;
  const candidate = (window as Window & { ethereum?: Eip1193Provider }).ethereum;
  return candidate ?? null;
}
