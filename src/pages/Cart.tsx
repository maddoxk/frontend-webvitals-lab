import { SmartImage } from '../components/SmartImage';
import { PrefetchLink } from '../components/PrefetchLink';
import { useCart } from '../lib/cart';
import { formatPrice, clampQty } from '../lib/format';
import { products } from '../data/products';

const ph = (id: string) => products.find((p) => p.id === id)?.placeholder ?? '';

export default function Cart() {
  const { items, subtotalCents, setQty, remove, clear, count } = useCart();

  if (items.length === 0) {
    return (
      <div className="page">
        <h1>Your cart</h1>
        <div className="empty">
          <p>Your cart is empty.</p>
          <PrefetchLink to="/products" className="btn btn--primary">Start shopping</PrefetchLink>
        </div>
      </div>
    );
  }

  const shipping = subtotalCents > 7500 ? 0 : 599;
  const total = subtotalCents + shipping;

  return (
    <div className="page">
      <div className="section__head">
        <h1>Your cart</h1>
        <button className="link-btn" onClick={clear}>Clear cart</button>
      </div>

      <div className="cart">
        <ul className="cart__lines">
          {items.map((i) => (
            <li key={i.id} className="cart__line">
              <PrefetchLink to={`/product/${i.slug}`} className="cart__thumb">
                <SmartImage seed={i.seed} alt={i.name} width={120} placeholder={ph(i.id)} sizes="120px" />
              </PrefetchLink>
              <div className="cart__meta">
                <PrefetchLink to={`/product/${i.slug}`} className="cart__name">{i.name}</PrefetchLink>
                <span className="muted">{formatPrice(i.priceCents)} each</span>
              </div>
              <label className="qty qty--sm">
                <span className="visually-hidden">Quantity for {i.name}</span>
                <button aria-label="Decrease" onClick={() => setQty(i.id, clampQty(i.qty - 1))}>−</button>
                <input
                  type="number"
                  min={1}
                  max={99}
                  value={i.qty}
                  onChange={(e) => setQty(i.id, clampQty(Number(e.target.value)))}
                />
                <button aria-label="Increase" onClick={() => setQty(i.id, clampQty(i.qty + 1))}>+</button>
              </label>
              <span className="cart__line-total">{formatPrice(i.priceCents * i.qty)}</span>
              <button className="cart__remove" aria-label={`Remove ${i.name}`} onClick={() => remove(i.id)}>×</button>
            </li>
          ))}
        </ul>

        <aside className="summary" aria-label="Order summary">
          <h2>Summary</h2>
          <div className="summary__row"><span>Items</span><span>{count}</span></div>
          <div className="summary__row"><span>Subtotal</span><span>{formatPrice(subtotalCents)}</span></div>
          <div className="summary__row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
          </div>
          <div className="summary__row summary__row--total">
            <span>Total</span><span>{formatPrice(total)}</span>
          </div>
          <button className="btn btn--primary btn--block">Checkout</button>
          <p className="summary__note">Demo only — no real payment is processed.</p>
        </aside>
      </div>
    </div>
  );
}
