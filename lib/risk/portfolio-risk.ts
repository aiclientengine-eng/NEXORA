export interface RiskAsset {
  symbol: string;
  value: number;
  volatility?: number;
}

export interface PortfolioRiskResult {
  totalValue: number;
  concentrationRisk: number;
  largestAllocation: number;
  estimatedVolatility: number | null;
  riskScore: number;
}

export function calculatePortfolioRisk(assets: RiskAsset[]): PortfolioRiskResult {
  const totalValue = assets.reduce((sum, asset) => sum + Math.max(0, asset.value), 0);
  if (totalValue === 0) {
    return { totalValue: 0, concentrationRisk: 0, largestAllocation: 0, estimatedVolatility: null, riskScore: 0 };
  }

  const weights = assets.map((asset) => Math.max(0, asset.value) / totalValue);
  const largestAllocation = Math.max(...weights);
  const concentrationRisk = weights.reduce((sum, weight) => sum + weight * weight, 0);
  const knownVolatility = assets.filter((asset) => typeof asset.volatility === 'number');
  const estimatedVolatility = knownVolatility.length
    ? knownVolatility.reduce((sum, asset) => sum + (asset.volatility ?? 0) * (Math.max(0, asset.value) / totalValue), 0)
    : null;

  const concentrationComponent = Math.min(60, concentrationRisk * 100);
  const volatilityComponent = estimatedVolatility === null ? 0 : Math.min(40, estimatedVolatility * 100);
  const riskScore = Math.round(Math.min(100, concentrationComponent + volatilityComponent));

  return { totalValue, concentrationRisk, largestAllocation, estimatedVolatility, riskScore };
}
