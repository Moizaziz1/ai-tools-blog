import Link from "next/link";
import { Cpu } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        background: "linear-gradient(180deg, var(--bg) 0%, var(--bg-card) 100%)",
        borderTop: "1px solid var(--border)",
        padding: "4rem 1.5rem 2.5rem",
        marginTop: "4rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Top Section */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.625rem",
              textDecoration: "none",
              color: "var(--text-header)",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, var(--accent), var(--accent-soft))",
                borderRadius: "10px",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px var(--accent-glow)",
              }}
            >
              <Cpu size={18} color="white" />
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem" }}>
              AIToolsHub
            </span>
          </Link>
          <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--text-muted)", maxWidth: "480px", margin: "0 auto" }}>
            Honest reviews and practical guides on AI tools — from people who actually use them.
          </p>
        </div>

        {/* Links Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "2.5rem",
            marginBottom: "3rem",
          }}
        >
          {/* Categories */}
          <div>
            <h4
              style={{
                color: "var(--text-header)",
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "1rem",
              }}
            >
              Categories
            </h4>
            {[
              ["AI Chatbots", "/category/AI%20Chatbots"],
              ["AI Coding Tools", "/category/AI%20Coding%20Tools"],
              ["AI Writing Tools", "/category/AI%20Writing%20Tools"],
              ["AI Image Generation", "/category/AI%20Image%20Generation"],
              ["AI Video Tools", "/category/AI%20Video%20Tools"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="footer-link"
                style={{
                  display: "block",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  padding: "0.35rem 0",
                }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                color: "var(--text-header)",
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "1rem",
              }}
            >
              Quick Links
            </h4>
            {[
              ["All Articles", "/articles"],
              ["Search", "/search"],
              ["About Us", "/about"],
              ["Contact", "/contact"],
              ["RSS Feed", "/feed.xml"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="footer-link"
                style={{
                  display: "block",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  padding: "0.35rem 0",
                }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Legal */}
          <div>
            <h4
              style={{
                color: "var(--text-header)",
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "1rem",
              }}
            >
              Legal
            </h4>
            {[
              ["Privacy Policy", "/privacy"],
              ["Terms of Service", "/terms"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="footer-link"
                style={{
                  display: "block",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  padding: "0.35rem 0",
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <p style={{ fontSize: "0.8rem", color: "var(--text-soft)" }}>
            &copy; {year} AIToolsHub. All rights reserved.
          </p>
          <p style={{ fontSize: "0.8rem", color: "var(--text-soft)" }}>
            Human-written AI reviews
          </p>
        </div>
      </div>
    </footer>
  );
}
