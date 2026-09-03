# billing-core

Money is handled in **whole cents, as integers, everywhere**. A function that
returns a fractional cent is a bug, not a rounding preference.

## Conventions

- `const` or `let`. Never `var`.
- No `console.log` in `src/` — the linter enforces both of these.
- Every exported function carries a JSDoc block with `@param` and `@returns`.
- Errors thrown from `src/` are subclasses of `BillingError`, never bare `Error`.
- Rounding, when unavoidable, happens **once**, on the final total, with
  `Math.round`. Never round an intermediate value.

## Commands

- `npm test` — the full suite
- `npm run lint` — the house linter

Both run in CI on every pull request and must be green to merge.
