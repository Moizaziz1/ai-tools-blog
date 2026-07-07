import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "AIToolsHub terms of service — the rules and guidelines for using our website.",
};

export default function TermsPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <Link href="/" style={{ color: "var(--text-soft)", textDecoration: "none", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "1.5rem" }}>
        <ArrowLeft size={14} /> Home
      </Link>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 4vw, 2.75rem)",
          fontWeight: 400,
          color: "var(--text-header)",
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
        }}
      >
        Terms of Service
      </h1>
      <p style={{ color: "var(--text-soft)", fontSize: "0.85rem", marginBottom: "2.5rem" }}>
        Last updated: January 1, 2025
      </p>
      <div style={{ height: "3px", background: "linear-gradient(90deg, var(--accent), var(--accent-soft), transparent)", marginBottom: "3rem", borderRadius: "2px" }} />

      <div className="article-content">
        <h2>Acceptance of Terms</h2>
        <p>
          By accessing and using AIToolsHub (&quot;the Site&quot;), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Site.
        </p>

        <h2>Use of the Site</h2>
        <p>
          AIToolsHub provides editorial content including reviews, guides, and comparisons of AI tools for informational purposes. You may use the Site for personal, non-commercial purposes subject to these Terms.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          All content on AIToolsHub — including articles, reviews, the site design, and branding — is the property of AIToolsHub and is protected by applicable intellectual property laws.
        </p>

        <h2>Accuracy of Information</h2>
        <p>
          We strive to provide accurate, up-to-date information about AI tools. However, the AI industry changes rapidly. Tool features, pricing, and availability may change after we publish a review.
        </p>

        <h2>Third-Party Links</h2>
        <p>
          The Site contains links to third-party websites, including the AI tools we review. These links are provided for convenience only. We are not responsible for the content or availability of third-party sites.
        </p>

        <h2>Disclaimer of Warranties</h2>
        <p>
          THE SITE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
        </p>

        <h2>Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the Site.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these Terms? Contact us at{" "}
          <a href="mailto:legal@aitoolshub.com" style={{ color: "var(--accent)" }}>
            legal@aitoolshub.com
          </a>
        </p>
      </div>
    </div>
  );
}
