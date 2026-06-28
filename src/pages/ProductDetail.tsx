import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SmartImage } from '../components/SmartImage';
import { PrefetchLink } from '../components/PrefetchLink';
import { getProduct } from '../data/products';
import { formatPrice, clampQty } from '../lib/format';
import { useCart } from '../lib/cart';

export default function ProductDetail() {
  const { slug = '' } = useParams();
  const product = getProduct(slug);
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="page">
        <h1>Product not found</h1>
        <p className="muted">We could not find “{slug}”.</p>
        <PrefetchLink to="/products" className="btn btn--primary">Back to catalog</PrefetchLink>
      </div>
    );
  }

  return (
    <div className="page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <PrefetchLink to="/products">Catalog</PrefetchLink>
        <span aria-hidden="true">/</span>
        <span>{product.name}</span>
      </nav>

      <div className="detail">
        <div className="detail__media">
          <SmartImage
            seed={product.seed}
            alt={product.name}
            width={600}
            placeholder={product.placeholder}
            priority
            sizes="(max-width: 800px) 100vw, 600px"
          />
        </div>
        <div className="detail__info">
          <span className="card__cat">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="detail__price">{formatPrice(product.priceCents)}</p>
          <p className="detail__desc">{product.description}</p>

          <div className="detail__buy">
            <label className="qty">
              <span className="visually-hidden">Quantity</span>
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => clampQty(q - 1))}
              >
                −
              </button>
              <input
                type="number"
                min={1}
                max={99}
                value={qty}
                onChange={(e) => setQty(clampQty(Number(e.target.value)))}
              />
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => clampQty(q + 1))}
              >
                +
              </button>
            </label>
            <button
              className="btn btn--primary"
              onClick={() => {
                add(
                  {
                    id: product.id,
                    slug: product.slug,
                    name: product.name,
                    priceCents: product.priceCents,
                    seed: product.seed,
                  },
                  qty
                );
                setAdded(true);
                window.setTimeout(() => setAdded(false), 1600);
              }}
            >
              {added ? 'Added ✓' : 'Add to cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
