import { PrefetchLink } from './PrefetchLink';
import { useCart } from '../lib/cart';

export function NavBar() {
  const { count } = useCart();
  return (
    <header className="nav">
      <div className="nav__inner">
        <PrefetchLink to="/" className="nav__brand">
          <span className="nav__logo" aria-hidden="true" />
          WebVitals&nbsp;Lab
        </PrefetchLink>
        <nav className="nav__links" aria-label="Primary">
          <PrefetchLink to="/products">Shop</PrefetchLink>
          <PrefetchLink to="/cart" className="nav__cart">
            Cart
            <span className="nav__badge" aria-label={`${count} items in cart`}>
              {count}
            </span>
          </PrefetchLink>
        </nav>
      </div>
    </header>
  );
}
