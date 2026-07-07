"use client";
import { useState } from "react";
import { Mail, ArrowRight, CheckCircle, Sparkles } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #0a0a12 0%, #12121f 50%, #1a1040 100%)",
        padding: "5rem 1.5rem",
        margin: "4rem 0 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Decor */}
      <div style={{
        position: "absolute",
        top: "-100px",
        right: "-100px",
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(108, 60, 233, 0.15) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: "-80px",
        left: "-80px",
        width: "250px",
        height: "250px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        {/* Icon */}
        <div
          style={{
            width: "56px",
            height: "56px",
            background: "linear-gradient(135deg, rgba(108, 60, 233, 0.2), rgba(167, 139, 250, 0.1))",
            border: "1px solid rgba(108, 60, 233, 0.3)",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
            boxShadow: "0 8px 32px rgba(108, 60, 233, 0.2)",
          }}
        >
          <Mail size={24} color="#a78bfa" />
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.6rem, 3vw, 2.25rem)",
            fontWeight: 400,
            color: "#ffffff",
            marginBottom: "0.875rem",
            lineHeight: 1.25,
          }}
        >
          New AI Tool Reviews, Weekly
        </h2>
        <p
          style={{
            color: "#9892ad",
            fontSize: "1rem",
            lineHeight: 1.75,
            marginBottom: "2.25rem",
          }}
        >
          Join readers who get our latest reviews and guides every week.
          No spam — unsubscribe any time.
        </p>

        {submitted ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.625rem",
              background: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.25)",
              borderRadius: "14px",
              padding: "1.125rem 1.5rem",
              color: "#6ee7b7",
              fontSize: "0.95rem",
              fontWeight: 600,
            }}
          >
            <CheckCircle size={18} />
            You&apos;re subscribed! Check your inbox.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", gap: "0.75rem", maxWidth: "460px", margin: "0 auto" }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{
                flex: 1,
                padding: "0.925rem 1.25rem",
                background: "rgba(255,255,255,0.06)",
                border: "1.5px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: "#ffffff",
                fontSize: "0.95rem",
                outline: "none",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#6c3ce9";
                e.target.style.boxShadow = "0 0 0 3px rgba(108, 60, 233, 0.15)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.1)";
                e.target.style.boxShadow = "none";
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? "rgba(108, 60, 233, 0.5)" : "linear-gradient(135deg, #6c3ce9, #a78bfa)",
                color: "#fff",
                border: "none",
                padding: "0.925rem 1.375rem",
                borderRadius: "12px",
                fontSize: "0.9rem",
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                whiteSpace: "nowrap" as const,
                transition: "all 0.2s",
                boxShadow: "0 4px 16px rgba(108, 60, 233, 0.3)",
              }}
            >
              {loading ? "…" : <><span>Subscribe</span> <ArrowRight size={15} /></>}
            </button>
          </form>
        )}

        <p style={{ color: "#5a5470", fontSize: "0.78rem", marginTop: "1.25rem" }}>
          No spam. Unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </section>
  );
}
