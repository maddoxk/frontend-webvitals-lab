import { PrefetchLink } from '../components/PrefetchLink';

export default function NotFound() {
  return (
    <div className="page">
      <div className="empty">
        <h1>404</h1>
        <p className="muted">That page drifted off the grid.</p>
        <PrefetchLink to="/" className="btn btn--primary">Go home</PrefetchLink>
      </div>
    </div>
  );
}
