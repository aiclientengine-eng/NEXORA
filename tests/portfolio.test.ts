import { describe, expect, it } from 'vitest';
import { calculateAllocation, calculateConcentrationRisk, calculateDrawdown } from '../lib/risk/portfolio';

describe('portfolio risk utilities', () => {
  it('calculates allocation percentages', () => {
    const result = calculateAllocation([{ symbol: 'BTC', value: 75 }, { symbol: 'ETH', value: 25 }]);
    expect(result[0].percentage).toBe(75);
    expect(result[1].percentage).toBe(25);
  });

  it('returns zero allocation for an empty portfolio', () => {
    expect(calculateAllocation([{ symbol: 'BTC', value: 0 }])[0].percentage).toBe(0);
  });

  it('calculates concentration and drawdown', () => {
    expect(calculateConcentrationRisk([{ symbol: 'BTC', value: 100 }])).toBe(1);
    expect(calculateDrawdown(80, 100)).toBe(20);
  });
});
