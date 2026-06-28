import { PrefetchLink } from '../components/PrefetchLink';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';

export default function Home() {
  const featured = products.slice(0, 4);
  return (
    <div className="page">
      <section className="hero">
        <div className="hero__content">
          <p className="hero__eyebrow">Performance &amp; accessibility, demonstrated</p>
          <h1 className="hero__title">
            A storefront engineered for <span className="grad">Core Web Vitals</span>.
          </h1>
          <p className="hero__sub">
            Route-level code-splitting, responsive lazy images, font-display swap,
            intent prefetching, and a PWA service worker — with a live HUD showing
            LCP, CLS, INP and TTFB as you browse.
          </p>
          <div className="hero__cta">
            <PrefetchLink to="/products" className="btn btn--primary">Shop the catalog</PrefetchLink>
            <a className="btn btn--ghost" href="https://github.com/maddoxk/frontend-webvitals-lab" target="_blank" rel="noreferrer">
              View source
            </a>
          </div>
          <ul className="hero__stats">
            <li><strong>4</strong> lazy routes</li>
            <li><strong>2x</strong> srcset images</li>
            <li><strong>0</strong> layout shift target</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="section__head">
          <h2>Featured</h2>
          <PrefetchLink to="/products" className="section__more">All products →</PrefetchLink>
        </div>
        <div className="grid">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i === 0} />
          ))}
        </div>
      </section>
    </div>
  );
}
