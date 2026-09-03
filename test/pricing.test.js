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
