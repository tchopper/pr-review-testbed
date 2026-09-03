import { test } from 'node:test';
import assert from 'node:assert/strict';
import { priceOrder } from '../src/pricing.js';
import { UnknownTierError } from '../src/errors.js';

test('prices a standard order', () => {
  assert.equal(priceOrder({ tier: 'standard', units: 4 }), 7500);
});

test('prices a priority order', () => {
  assert.equal(priceOrder({ tier: 'priority', units: 2 }), 6500);
});

test('rejects an unknown tier', () => {
  assert.throws(() => priceOrder({ tier: 'gold', units: 1 }), UnknownTierError);
});

test('does not discount a standard order below the threshold', () => {
  assert.equal(priceOrder({ tier: 'standard', units: 9 }), 16875);
});

test('discounts a standard order at the threshold: 10 units qualifies', () => {
  // The threshold is inclusive. 1875 * 10 = 18750; Math.round(18750 * 0.9) = 16875.
  assert.equal(priceOrder({ tier: 'standard', units: 10 }), 16875);
});

test('discounts a standard order above the threshold, rounding once', () => {
  // 1875 * 11 = 20625; Math.round(20625 * 0.9) = 18563, not 1688 * 11.
  assert.equal(priceOrder({ tier: 'standard', units: 11 }), 18563);
});

test('never discounts a priority order, however large', () => {
  assert.equal(priceOrder({ tier: 'priority', units: 11 }), 35750);
  assert.equal(priceOrder({ tier: 'priority', units: 100 }), 325000);
});

test('the total never decreases as units increase across the boundary', () => {
  // Guards the price inversion an exclusive threshold produced: 11 units once
  // cost less in total than 10 did.
  for (const tier of ['standard', 'priority']) {
    let previous = -1;
    for (let units = 0; units <= 40; units++) {
      const total = priceOrder({ tier, units });
      assert.ok(
        total >= previous,
        `${tier}: ${units} units costs ${total}, less than ${units - 1} units at ${previous}`,
      );
      previous = total;
    }
  }
});
