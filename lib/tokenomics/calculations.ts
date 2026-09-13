export const PROPOSED_MAX_SUPPLY = 5_000_000_000;

export function calculateMarketCap(circulatingSupply: number, tokenPrice: number): number {
  return Math.max(0, circulatingSupply) * Math.max(0, tokenPrice);
}

export function calculateFDV(maxSupply: number, tokenPrice: number): number {
  return Math.max(0, maxSupply) * Math.max(0, tokenPrice);
}

export function calculateTokenomics(tokenPrice: number, circulatingSupply: number, maxSupply = PROPOSED_MAX_SUPPLY) {
  return {
    marketCap: calculateMarketCap(circulatingSupply, tokenPrice),
    fdv: calculateFDV(maxSupply, tokenPrice),
    circulatingSupply,
    maxSupply,
  };
}
