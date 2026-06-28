export interface Product {
  id: string;
  slug: string;
  name: string;
  priceCents: number;
  category: string;
  blurb: string;
  description: string;
  /** Stable seed for picsum.photos so images are deterministic and cacheable. */
  seed: string;
  /** A tiny inline blur-up placeholder (solid-ish gradient) to prevent CLS. */
  placeholder: string;
}

function ph(c1: string, c2: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 3"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect width="4" height="3" fill="url(#g)"/></svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

export const products: Product[] = [
  {
    id: 'p1', slug: 'aero-runner', name: "Aero Runner Sneaker", priceCents: 12900,
    category: 'Footwear', seed: 'aero-runner',
    blurb: 'Featherweight daily trainer with responsive foam.',
    description: 'The Aero Runner pairs a breathable engineered-knit upper with a responsive supercritical-foam midsole. At 218g it disappears on your foot, yet returns energy on every stride. Built for the commute, the gym, and the long way home.',
    placeholder: ph('#1e3a8a', '#4ade80'),
  },
  {
    id: 'p2', slug: 'nimbus-jacket', name: 'Nimbus Shell Jacket', priceCents: 18900,
    category: 'Outerwear', seed: 'nimbus-jacket',
    blurb: 'Packable 3-layer waterproof shell, 198g.',
    description: 'A fully-taped 3-layer membrane keeps the weather out while staying impossibly light. Packs into its own chest pocket. The articulated hood and pit-zips mean you stay dry climbing and comfortable descending.',
    placeholder: ph('#0f766e', '#22d3ee'),
  },
  {
    id: 'p3', slug: 'orbit-backpack', name: 'Orbit 22L Backpack', priceCents: 9900,
    category: 'Bags', seed: 'orbit-backpack',
    blurb: 'Clamshell carry-on with a padded 16" laptop sleeve.',
    description: 'The Orbit opens flat like a suitcase, with a suspended laptop sleeve that floats above the ground. Weather-resistant recycled sailcloth, magnetic quick-stash pockets, and a luggage pass-through for travel days.',
    placeholder: ph('#3730a3', '#a78bfa'),
  },
  {
    id: 'p4', slug: 'pulse-earbuds', name: 'Pulse ANC Earbuds', priceCents: 14900,
    category: 'Audio', seed: 'pulse-earbuds',
    blurb: 'Adaptive noise cancelling, 8h + 24h case.',
    description: 'Hybrid adaptive ANC reads your environment 200x a second. Custom 11mm drivers deliver warm low-end without muddying vocals. Multipoint pairing, wireless charging, and an IPX5 rating for sweaty sessions.',
    placeholder: ph('#9d174d', '#fb7185'),
  },
  {
    id: 'p5', slug: 'terra-bottle', name: 'Terra Insulated Bottle', priceCents: 3400,
    category: 'Gear', seed: 'terra-bottle',
    blurb: '24h cold / 12h hot, 750ml, leakproof.',
    description: 'Double-wall vacuum steel keeps drinks cold for a full day. The leakproof flip-lock cap drinks one-handed, and the powder-coat finish shrugs off scratches in a busy bag.',
    placeholder: ph('#854d0e', '#fbbf24'),
  },
  {
    id: 'p6', slug: 'lumen-lamp', name: 'Lumen Desk Lamp', priceCents: 7900,
    category: 'Home', seed: 'lumen-lamp',
    blurb: 'Flicker-free, tunable 2700–6500K, USB-C.',
    description: 'A wide diffused panel eliminates harsh shadows and screen glare. Stepless brightness and color temperature, plus a USB-C passthrough to keep your desk tidy and your eyes comfortable late into the night.',
    placeholder: ph('#1f2937', '#9ca3af'),
  },
  {
    id: 'p7', slug: 'flux-keyboard', name: 'Flux Mechanical Keyboard', priceCents: 11900,
    category: 'Desk', seed: 'flux-keyboard',
    blurb: 'Hot-swap, gasket-mount, low-latency 2.4GHz.',
    description: 'A gasket-mounted 75% board with a soft, cushioned typing feel. Hot-swap sockets let you change switches without a soldering iron. Tri-mode connectivity and an 8000Hz polling rate for the lag-averse.',
    placeholder: ph('#111827', '#34d399'),
  },
  {
    id: 'p8', slug: 'drift-sunglasses', name: 'Drift Polarized Sunglasses', priceCents: 8900,
    category: 'Accessories', seed: 'drift-sunglasses',
    blurb: 'Polarized, lightweight bio-acetate frame.',
    description: 'Polarized lenses cut glare off water and asphalt while keeping colors true. The bio-acetate frame is feather-light and springy, with grippy temple tips that stay put on the move.',
    placeholder: ph('#0c4a6e', '#38bdf8'),
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
