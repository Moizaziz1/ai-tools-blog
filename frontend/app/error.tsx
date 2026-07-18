"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "6rem 1.5rem", textAlign: "center" }}>
      <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>⚠️</div>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 400, color: "var(--text-header)", marginBottom: "0.75rem" }}>
        Something went wrong
      </h1>
      <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "2rem" }}>
        We encountered an unexpected error. Please try again or contact us if the problem persists.
      </p>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <button onClick={() => reset()} className="btn-primary">
          Try Again
        </button>
        <Link href="/" className="btn-secondary" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
          Go Home
        </Link>
      </div>
    </div>
  );
}
