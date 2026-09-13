export type WalletProvider = 'metamask' | 'walletconnect' | 'coinbase' | 'injected';

export interface ConnectedWallet {
  address: string;
  chainId: number;
  provider: WalletProvider;
  connectedAt: string;
}

export interface WalletBalance {
  address: string;
  chainId: number;
  nativeBalance: string;
  tokenBalances: Array<{
    symbol: string;
    contractAddress: string;
    balance: string;
    decimals: number;
  }>;
}

export interface WalletProviderAdapter {
  connect(): Promise<ConnectedWallet>;
  disconnect(): Promise<void>;
  getBalance(address: string): Promise<WalletBalance>;
}
