import { useCallback, useRef } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

/** Map of route prefix -> dynamic import, so hovering prefetches the chunk. */
const prefetchers: Record<string, () => Promise<unknown>> = {
  '/': () => import('../pages/Home'),
  '/products': () => import('../pages/Products'),
  '/product': () => import('../pages/ProductDetail'),
  '/cart': () => import('../pages/Cart'),
};

function prefetchFor(to: string) {
  if (to === '/') return prefetchers['/'];
  const key = Object.keys(prefetchers)
    .filter((k) => k !== '/')
    .find((k) => to.startsWith(k));
  return key ? prefetchers[key] : undefined;
}

/**
 * A react-router Link that prefetches the target route's lazy chunk on
 * hover/focus (intent), so navigation feels instant without eagerly loading
 * every route up front.
 */
export function PrefetchLink({ to, children, ...rest }: LinkProps) {
  const done = useRef(false);

  const warm = useCallback(() => {
    if (done.current) return;
    const fn = typeof to === 'string' ? prefetchFor(to) : undefined;
    if (fn) {
      done.current = true;
      void fn();
    }
  }, [to]);

  return (
    <Link to={to} onMouseEnter={warm} onFocus={warm} onTouchStart={warm} {...rest}>
      {children}
    </Link>
  );
}
