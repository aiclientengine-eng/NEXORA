import type { MarketAsset, MarketDataProvider } from './types';

const demoAssets: MarketAsset[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: null, change24h: null, marketCap: null, volume24h: null, high24h: null, low24h: null, isDemo: true },
  { symbol: 'ETH', name: 'Ethereum', price: null, change24h: null, marketCap: null, volume24h: null, high24h: null, low24h: null, isDemo: true },
  { symbol: 'SOL', name: 'Solana', price: null, change24h: null, marketCap: null, volume24h: null, high24h: null, low24h: null, isDemo: true },
  { symbol: 'BNB', name: 'BNB', price: null, change24h: null, marketCap: null, volume24h: null, high24h: null, low24h: null, isDemo: true },
  { symbol: 'XRP', name: 'XRP', price: null, change24h: null, marketCap: null, volume24h: null, high24h: null, low24h: null, isDemo: true },
  { symbol: 'USDT', name: 'Tether', price: null, change24h: null, marketCap: null, volume24h: null, high24h: null, low24h: null, isDemo: true },
  { symbol: 'USDC', name: 'USD Coin', price: null, change24h: null, marketCap: null, volume24h: null, high24h: null, low24h: null, isDemo: true },
  { symbol: 'NXR', name: 'NEXORA', price: null, change24h: null, marketCap: null, volume24h: null, high24h: null, low24h: null, isDemo: true },
];

export class DemoMarketDataProvider implements MarketDataProvider {
  async getAssets(symbols: string[]) {
    const requested = new Set(symbols.map((symbol) => symbol.toUpperCase()));
    return demoAssets.filter((asset) => requested.has(asset.symbol));
  }

  async getAsset(symbol: string) {
    return demoAssets.find((asset) => asset.symbol === symbol.toUpperCase()) ?? null;
  }
}
