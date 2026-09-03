import { UnknownTierError } from './errors.js';

/** Price per unit, in whole cents. */
export const RATE_CARD = {
  standard: 1875,
  priority: 3250,
};

/**
 * Price an order.
 * @param {{tier: string, units: number}} order
 * @returns {number} the order total, in whole cents
 */
export function priceOrder(order) {
  const rate = RATE_CARD[order.tier];
  if (rate === undefined) {
    throw new UnknownTierError(order.tier);
  }
  return rate * order.units;
}
