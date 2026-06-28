import { useEffect, useState } from 'react';
import { onLCP, onCLS, onINP, onTTFB, onFCP, type Metric } from 'web-vitals';

type Rating = 'good' | 'needs-improvement' | 'poor' | 'pending';

interface VitalState {
  value: number | null;
  rating: Rating;
}

const INITIAL: Record<string, VitalState> = {
  LCP: { value: null, rating: 'pending' },
  INP: { value: null, rating: 'pending' },
  CLS: { value: null, rating: 'pending' },
  FCP: { value: null, rating: 'pending' },
  TTFB: { value: null, rating: 'pending' },
};

function fmt(name: string, v: number | null): string {
  if (v === null) return '–';
  if (name === 'CLS') return v.toFixed(3);
  return `${Math.round(v)} ms`;
}

/**
 * A live, fixed-position Core Web Vitals overlay. Subscribes to the official
 * `web-vitals` library and updates each metric as it fires during the session.
 */
export function VitalsHUD() {
  const [vitals, setVitals] = useState(INITIAL);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const update = (m: Metric) =>
      setVitals((prev) => ({
        ...prev,
        [m.name]: { value: m.value, rating: m.rating as Rating },
      }));

    onLCP(update);
    onINP(update);
    onCLS(update);
    onFCP(update);
    onTTFB(update);
  }, []);

  return (
    <aside className={`hud ${open ? 'hud--open' : 'hud--closed'}`} aria-label="Core Web Vitals monitor">
      <button
        className="hud__toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="hud__pulse" aria-hidden="true" />
        Web Vitals {open ? '▾' : '▸'}
      </button>
      {open && (
        <ul className="hud__list">
          {Object.entries(vitals).map(([name, s]) => (
            <li key={name} className={`hud__row hud__row--${s.rating}`}>
              <span className="hud__metric">{name}</span>
              <span className="hud__value">{fmt(name, s.value)}</span>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
