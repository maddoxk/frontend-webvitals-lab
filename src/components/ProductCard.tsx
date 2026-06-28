import { PrefetchLink } from './PrefetchLink';
import { SmartImage } from './SmartImage';
import { formatPrice } from '../lib/format';
import type { Product } from '../data/products';

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <article className="card">
      <PrefetchLink to={`/product/${product.slug}`} className="card__media-link" aria-label={product.name}>
        <SmartImage
          seed={product.seed}
          alt={product.name}
          width={400}
          placeholder={product.placeholder}
          priority={priority}
          sizes="(max-width: 600px) 50vw, 280px"
        />
      </PrefetchLink>
      <div className="card__body">
        <span className="card__cat">{product.category}</span>
        <h3 className="card__title">
          <PrefetchLink to={`/product/${product.slug}`}>{product.name}</PrefetchLink>
        </h3>
        <p className="card__blurb">{product.blurb}</p>
        <div className="card__foot">
          <span className="card__price">{formatPrice(product.priceCents)}</span>
        </div>
      </div>
    </article>
  );
}
