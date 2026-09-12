export type Holding = {
  symbol: string;
  value: number;
};

export function calculateAllocation(holdings: Holding[]) {
  const total = holdings.reduce((sum, holding) => sum + Math.max(0, holding.value), 0);
  if (total === 0) return holdings.map((holding) => ({ ...holding, percentage: 0 }));
  return holdings.map((holding) => ({
    ...holding,
    percentage: (Math.max(0, holding.value) / total) * 100,
  }));
}

export function calculateConcentrationRisk(holdings: Holding[]) {
  const allocations = calculateAllocation(holdings);
  return allocations.reduce((sum, holding) => sum + (holding.percentage / 100) ** 2, 0);
}

export function calculateDrawdown(currentValue: number, peakValue: number) {
  if (peakValue <= 0) return 0;
  return Math.max(0, ((peakValue - currentValue) / peakValue) * 100);
}
