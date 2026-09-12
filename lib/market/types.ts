export type MarketAsset = {
  symbol: string;
  name: string;
  price: number | null;
  change24h: number | null;
  marketCap: number | null;
  volume24h: number | null;
  high24h: number | null;
  low24h: number | null;
  isDemo: boolean;
};

export interface MarketDataProvider {
  getAssets(symbols: string[]): Promise<MarketAsset[]>;
  getAsset(symbol: string): Promise<MarketAsset | null>;
}
