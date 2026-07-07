import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "65vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "480px" }}>
        <div
          className="gradient-text"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "7rem",
            lineHeight: 1,
            marginBottom: "1rem",
            fontWeight: 400,
          }}
        >
          404
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.85rem",
            fontWeight: 400,
            color: "var(--text-header)",
            marginBottom: "0.875rem",
          }}
        >
          Page not found
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1rem", lineHeight: 1.75, marginBottom: "2rem" }}>
          The article or page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <div style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/"
            className="btn-primary"
            style={{ textDecoration: "none" }}
          >
            Back to Home
          </Link>
          <Link
            href="/articles"
            className="btn-secondary"
            style={{ textDecoration: "none" }}
          >
            Browse Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
