import { test } from 'node:test';
import assert from 'node:assert/strict';
import { invoiceLine } from '../src/invoice.js';

test('renders an invoice line', () => {
  assert.deepEqual(invoiceLine({ tier: 'standard', units: 4 }), {
    description: '4 x standard',
    total: 7500,
  });
});
