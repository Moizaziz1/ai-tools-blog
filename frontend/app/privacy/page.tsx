import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "AIToolsHub privacy policy — how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  const updated = "July 7, 2026";

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
        Privacy Policy
      </h1>
      <p style={{ color: "var(--text-soft)", fontSize: "0.85rem", marginBottom: "2.5rem" }}>
        Last updated: {updated}
      </p>

      <div style={{ height: "3px", background: "linear-gradient(90deg, var(--accent), var(--accent-soft), transparent)", marginBottom: "3rem", borderRadius: "2px" }} />

      <div className="article-content">
        <h2>Overview</h2>
        <p>
          AIToolsHub (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy. This Privacy Policy explains how we collect, use, and protect information when you visit our website at aitoolshub.com (the &quot;Site&quot;).
        </p>

        <h2>Information We Collect</h2>
        <h3>Automatically Collected Information</h3>
        <p>
          When you visit our Site, we automatically collect certain technical information including your IP address, browser type and version, operating system, referring URLs, pages visited, and the date and time of your visit.
        </p>

        <h3>Cookies and Tracking Technologies</h3>
        <p>
          We use cookies and similar tracking technologies to analyze traffic patterns and improve your experience. You can control cookie settings through your browser preferences.
        </p>

        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Operate and maintain the Site</li>
          <li>Analyze how visitors use the Site to improve content and performance</li>
          <li>Monitor for security issues and prevent abuse</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2>Google AdSense and Advertising</h2>
        <p>
          We use Google AdSense to display advertisements on our Site. Google AdSense uses cookies to serve ads based on your prior visits to our Site and other sites on the internet.
        </p>
        <p>
          You may opt out of personalized advertising by visiting{" "}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
            Google&apos;s Ads Settings
          </a>
          .
        </p>

        <h2>Third-Party Links</h2>
        <p>
          Our Site contains links to third-party websites, including the AI tools we review. We are not responsible for the privacy practices of those sites.
        </p>

        <h2>Data Retention</h2>
        <p>
          We retain automatically collected analytics data for up to 26 months. Server logs are retained for up to 90 days for security purposes.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy or our data practices, please contact us at:{" "}
          <a href="mailto:privacy@aitoolshub.com" style={{ color: "var(--accent)" }}>
            privacy@aitoolshub.com
          </a>
        </p>
      </div>
    </div>
  );
}
