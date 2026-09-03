import { priceOrder } from './pricing.js';

/**
 * Render an invoice line for a single order.
 * @param {{tier: string, units: number}} order
 * @returns {{description: string, total: number}}
 */
export function invoiceLine(order) {
  const total = priceOrder(order);
  return {
    description: `${order.units} x ${order.tier}`,
    total,
  };
}
