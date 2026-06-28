/** Pure utility helpers — unit tested with vitest. */

/** Format a number of cents as a localized USD currency string. */
export function formatPrice(cents: number): string {
  if (!Number.isFinite(cents)) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}

export interface CartLine {
  id: string;
  priceCents: number;
  qty: number;
}

/** Sum the line totals of a cart, in cents. Ignores non-positive quantities. */
export function cartSubtotalCents(lines: CartLine[]): number {
  return lines.reduce((sum, line) => {
    const qty = Math.max(0, Math.floor(line.qty));
    return sum + line.priceCents * qty;
  }, 0);
}

/** Total item count across cart lines. */
export function cartItemCount(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + Math.max(0, Math.floor(line.qty)), 0);
}

/**
 * Build a responsive srcset string for picsum.photos given a seed and a list
 * of widths. Height is derived from a 4:3 aspect ratio to keep CLS stable.
 */
export function buildSrcSet(seed: string, widths: number[]): string {
  return widths
    .map((w) => `https://picsum.photos/seed/${seed}/${w}/${Math.round((w * 3) / 4)} ${w}w`)
    .join(', ');
}

/** Clamp a quantity into a sane inclusive range. */
export function clampQty(qty: number, min = 1, max = 99): number {
  if (Number.isNaN(qty)) return min;
  return Math.min(max, Math.max(min, Math.floor(qty)));
}
