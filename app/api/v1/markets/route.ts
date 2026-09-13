import { DemoMarketDataProvider } from '../../../../../lib/market/demo-provider';
import { jsonError, jsonOk } from '../../../../../lib/api-response';

const provider = new DemoMarketDataProvider();
const DEFAULT_SYMBOLS = ['BTC', 'ETH', 'SOL', 'BNB', 'XRP', 'USDT', 'USDC', 'NXR'];

export async function GET(request: Request) {
  const url = new URL(request.url);
  const rawSymbols = url.searchParams.get('symbols');
  const symbols = rawSymbols
    ? rawSymbols.split(',').map((symbol) => symbol.trim().toUpperCase()).filter(Boolean)
    : DEFAULT_SYMBOLS;

  if (symbols.length > 50) {
    return jsonError('INVALID_QUERY', 'A maximum of 50 symbols may be requested.', 400);
  }

  try {
    const assets = await provider.getAssets(symbols);
    return jsonOk({
      mode: 'DEMO',
      source: 'DemoMarketDataProvider',
      generatedAt: new Date().toISOString(),
      assets,
      notice: 'DEMO DATA — live market providers are not configured.',
    });
  } catch (error) {
    console.error('markets_error', error);
    return jsonError('MARKET_DATA_UNAVAILABLE', 'Market data is temporarily unavailable.', 503);
  }
}
