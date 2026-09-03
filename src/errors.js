/** Base class for every error thrown by billing-core. */
export class BillingError extends Error {}

/** Thrown when an order names a tier that is not on the rate card. */
export class UnknownTierError extends BillingError {
  /** @param {string} tier */
  constructor(tier) {
    super(`unknown tier: ${tier}`);
    this.tier = tier;
  }
}
