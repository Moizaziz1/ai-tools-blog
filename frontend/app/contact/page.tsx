import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageSquare, Clock, ArrowLeft } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the AIToolsHub team — for corrections, tool suggestions, or general inquiries.",
};

export default function ContactPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <Link href="/" style={{ color: "var(--text-soft)", textDecoration: "none", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "1.5rem" }}><ArrowLeft size={14} /> Home</Link>

      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, color: "var(--text-header)", marginTop: "0.5rem", marginBottom: "0.875rem" }}>
        Contact Us
      </h1>
      <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "2.5rem" }}>
        Have a correction, suggestion, or question? We read every message.
      </p>

      <div style={{ height: "3px", background: "linear-gradient(90deg, var(--accent), var(--accent-soft), transparent)", marginBottom: "3rem", borderRadius: "2px" }} />

      {/* Contact Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginBottom: "3rem" }}>
        {[
          { icon: Mail, title: "General Inquiries", desc: "Questions about our reviews or website", email: "hello@aitoolshub.com", color: "#6c3ce9" },
          { icon: MessageSquare, title: "Editorial", desc: "Corrections, tip-offs, or article suggestions", email: "editorial@aitoolshub.com", color: "#10b981" },
          { icon: Clock, title: "Response Time", desc: "We typically respond within 48 hours", email: null, color: "#f59e0b" },
        ].map(({ icon: Icon, title, desc, email, color }) => (
          <div key={title} className="card-hover" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "1.5rem", transition: "all 0.2s" }}
          >
            <div style={{ width: "44px", height: "44px", background: `${color}12`, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
              <Icon size={20} color={color} />
            </div>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--text-header)", marginBottom: "0.4rem" }}>{title}</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: email ? "0.75rem" : 0 }}>{desc}</p>
            {email && (
              <a href={`mailto:${email}`} style={{ fontSize: "0.85rem", color, fontWeight: 600, textDecoration: "none" }}>{email}</a>
            )}
          </div>
        ))}
      </div>

      {/* Contact Form */}
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "20px", padding: "2rem" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 400, color: "var(--text-header)", marginBottom: "1.5rem" }}>
          Send a Message
        </h2>
        <ContactForm />
      </div>

      <div className="article-content" style={{ marginTop: "3rem" }}>
        <h2>What We Can Help With</h2>
        <p>We welcome messages about the following topics:</p>
        <ul>
          <li><strong>Factual corrections</strong> — If something in an article is wrong or outdated, please tell us.</li>
          <li><strong>Tool suggestions</strong> — Know an AI tool we should review? We&apos;re always looking for new ones.</li>
          <li><strong>Technical issues</strong> — If the site isn&apos;t working correctly for you, let us know.</li>
          <li><strong>General feedback</strong> — We genuinely want to know what&apos;s useful and what isn&apos;t.</li>
        </ul>
      </div>
    </div>
  );
}
