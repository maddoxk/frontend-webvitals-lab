import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { VitalsHUD } from './components/VitalsHUD';

// Route-based code splitting: each page is its own chunk, loaded on demand.
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const NotFound = lazy(() => import('./pages/NotFound'));

function RouteFallback() {
  return (
    <div className="route-fallback" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <span className="visually-hidden">Loading…</span>
    </div>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <NavBar />
      <main id="main">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <footer className="footer">
        <p>
          WebVitals Lab — a Core Web Vitals engineering demo by{' '}
          <a href="https://github.com/maddoxk" target="_blank" rel="noreferrer">Maddox Krape</a>.
          Images via picsum.photos.
        </p>
      </footer>
      <VitalsHUD />
    </>
  );
}
