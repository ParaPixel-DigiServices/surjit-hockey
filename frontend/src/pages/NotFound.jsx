import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="text-3xl font-semibold">404 — Page Not Found</h2>
      <p className="text-white/70">
        This route doesn’t exist yet. Return to the home page.
      </p>
      <Link to="/" className="btn btn-primary">
        Back Home
      </Link>
    </main>
  );
}
