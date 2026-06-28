import { describe, it, expect } from 'vitest';
import {
  formatPrice,
  cartSubtotalCents,
  cartItemCount,
  buildSrcSet,
  clampQty,
  type CartLine,
} from '../format';

describe('formatPrice', () => {
  it('formats whole dollars', () => {
    expect(formatPrice(2000)).toBe('$20.00');
  });
  it('formats cents', () => {
    expect(formatPrice(1999)).toBe('$19.99');
  });
  it('handles zero', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });
  it('guards against non-finite input', () => {
    expect(formatPrice(NaN)).toBe('$0.00');
    expect(formatPrice(Infinity)).toBe('$0.00');
  });
});

const lines: CartLine[] = [
  { id: 'a', priceCents: 1000, qty: 2 },
  { id: 'b', priceCents: 250, qty: 3 },
];

describe('cartSubtotalCents', () => {
  it('sums line totals', () => {
    expect(cartSubtotalCents(lines)).toBe(2750);
  });
  it('returns 0 for empty cart', () => {
    expect(cartSubtotalCents([])).toBe(0);
  });
  it('ignores negative quantities', () => {
    expect(cartSubtotalCents([{ id: 'x', priceCents: 500, qty: -4 }])).toBe(0);
  });
});

describe('cartItemCount', () => {
  it('counts total items', () => {
    expect(cartItemCount(lines)).toBe(5);
  });
  it('floors fractional quantities', () => {
    expect(cartItemCount([{ id: 'x', priceCents: 1, qty: 2.9 }])).toBe(2);
  });
});

describe('buildSrcSet', () => {
  it('produces a descriptor per width with 4:3 heights', () => {
    const out = buildSrcSet('shoe', [400, 800]);
    expect(out).toContain('https://picsum.photos/seed/shoe/400/300 400w');
    expect(out).toContain('https://picsum.photos/seed/shoe/800/600 800w');
    expect(out.split(',')).toHaveLength(2);
  });
});

describe('clampQty', () => {
  it('clamps below the minimum', () => {
    expect(clampQty(0)).toBe(1);
  });
  it('clamps above the maximum', () => {
    expect(clampQty(500)).toBe(99);
  });
  it('floors and passes valid values', () => {
    expect(clampQty(4.7)).toBe(4);
  });
  it('falls back to min on NaN', () => {
    expect(clampQty(NaN)).toBe(1);
  });
});
