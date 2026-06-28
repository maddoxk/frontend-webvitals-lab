import { useMemo, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';

export default function Products() {
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(products.map((p) => p.category)))],
    []
  );
  const [active, setActive] = useState('All');

  const visible = active === 'All' ? products : products.filter((p) => p.category === active);

  return (
    <div className="page">
      <div className="section__head">
        <h1>Catalog</h1>
        <span className="muted">{visible.length} products</span>
      </div>

      <div className="filters" role="tablist" aria-label="Filter by category">
        {categories.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={active === c}
            className={`chip ${active === c ? 'chip--active' : ''}`}
            onClick={() => setActive(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid">
        {visible.map((p, i) => (
          <ProductCard key={p.id} product={p} priority={i === 0} />
        ))}
      </div>
    </div>
  );
}
