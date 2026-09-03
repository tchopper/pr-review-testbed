import { UnknownTierError } from './errors.js';

/** Price per unit, in whole cents. */
export const RATE_CARD = {
  standard: 1875,
  priority: 3250,
};

/** Standard-tier orders above this many units qualify for the bulk discount. */
export const BULK_THRESHOLD = 10;

/** Fraction taken off a qualifying order. */
export const BULK_DISCOUNT = 0.1;

/**
 * Price an order, applying the standard-tier bulk discount where it qualifies.
 * @param {{tier: string, units: number}} order
 * @returns {number} the order total, in whole cents
 */
export function priceOrder(order) {
  const rate = RATE_CARD[order.tier];
  if (rate === undefined) {
    throw new UnknownTierError(order.tier);
  }

  var effectiveRate = rate;
  if (order.tier === 'standard' && order.units > BULK_THRESHOLD) {
    effectiveRate = Math.round(rate * (1 - BULK_DISCOUNT));
  }

  console.log('pricing', order.tier, order.units, effectiveRate);
  return effectiveRate * order.units;
}
