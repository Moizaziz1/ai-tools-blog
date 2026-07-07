import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, Eye, Users, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About AIToolsHub",
  description:
    "Learn about AIToolsHub — who we are, how we review AI tools, and our commitment to honest, human-written content.",
};

export default function AboutPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "3rem" }}>
        <Link href="/" style={{ color: "var(--text-soft)", textDecoration: "none", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "1.5rem", transition: "color 0.2s" }}>
          <ArrowLeft size={14} /> Home
        </Link>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 400,
            color: "var(--text-header)",
            marginTop: "0.5rem",
            marginBottom: "0.875rem",
            lineHeight: 1.2,
          }}
        >
          About AIToolsHub
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", lineHeight: 1.7 }}>
          Honest, human-written reviews on the AI tools that actually matter.
        </p>
      </div>

      {/* Divider */}
      <div style={{ height: "3px", background: "linear-gradient(90deg, var(--accent), var(--accent-soft), transparent)", marginBottom: "3rem", borderRadius: "2px" }} />

      {/* Values Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem", marginBottom: "3rem" }}>
        {[
          { icon: Eye, label: "Honest Reviews", desc: "No sponsored content", color: "#6c3ce9" },
          { icon: Users, label: "User-First", desc: "Real user experiences", color: "#10b981" },
          { icon: Shield, label: "Independent", desc: "No affiliate bias", color: "#f59e0b" },
          { icon: Zap, label: "Up-to-Date", desc: "Regularly updated", color: "#ec4899" },
        ].map(({ icon: Icon, label, desc, color }) => (
          <div key={label} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "14px", padding: "1.25rem", textAlign: "center" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.75rem" }}>
              <Icon size={18} color={color} />
            </div>
            <p style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text-header)", marginBottom: "0.2rem" }}>{label}</p>
            <p style={{ fontSize: "0.78rem", color: "var(--text-soft)" }}>{desc}</p>
          </div>
        ))}
      </div>

      <div className="article-content">
        <h2>Who We Are</h2>
        <p>
          AIToolsHub is an independent review publication dedicated to helping individuals, teams, and businesses navigate the rapidly growing world of artificial intelligence tools. We are not affiliated with, sponsored by, or paid by any of the AI companies whose products we review.
        </p>
        <p>
          Our team uses AI tools every day — for writing, coding, research, design, and productivity. That hands-on experience forms the foundation of everything we publish here.
        </p>

        <h2>How We Review AI Tools</h2>
        <p>
          Every review on AIToolsHub follows the same process. We use the tool in real workflows, over a meaningful period of time, before writing anything. We pay for our own subscriptions. We test both the free and paid tiers. We push the tools to their limits to understand where they succeed and where they fall short.
        </p>
        <p>
          Our reviews are structured to answer the questions that actually matter: What does this tool do well? Where does it disappoint? Who should use it — and who shouldn&apos;t? Is the pricing fair? How does it compare to alternatives?
        </p>

        <h2>What We Cover</h2>
        <p>
          We focus on AI tools that ordinary people and professionals actually use, across categories including:
        </p>
        <ul>
          <li><strong>AI Chatbots</strong> — ChatGPT, Claude, Gemini, and others</li>
          <li><strong>AI Coding Tools</strong> — Cursor, GitHub Copilot, and developer-focused assistants</li>
          <li><strong>AI Writing Tools</strong> — Jasper, Grammarly AI, Copy.ai, and writing assistants</li>
          <li><strong>AI Image Generation</strong> — Midjourney, DALL-E, Adobe Firefly, Stable Diffusion</li>
          <li><strong>AI Video Tools</strong> — Runway, Sora, and video generation platforms</li>
          <li><strong>AI Audio Tools</strong> — ElevenLabs, voice synthesis, and audio AI</li>
          <li><strong>AI Productivity Tools</strong> — Notion AI and workflow automation</li>
          <li><strong>AI Search &amp; Research</strong> — Perplexity AI and research-focused tools</li>
        </ul>

        <h2>Our Editorial Standards</h2>
        <p>
          All content on AIToolsHub is written by humans, based on direct experience with the tools we review. We do not use AI to generate our articles — we review AI tools, we are not produced by them.
        </p>

        <h2>Contact Us</h2>
        <p>
          We welcome feedback, suggestions for tools to review, and corrections if we get something wrong. You can reach our editorial team at{" "}
          <a href="mailto:hello@aitoolshub.com" style={{ color: "var(--accent)" }}>
            hello@aitoolshub.com
          </a>
          .
        </p>
      </div>

      {/* CTA */}
      <div
        style={{
          marginTop: "3.5rem",
          background: "linear-gradient(135deg, var(--accent), #4f39c7)",
          borderRadius: "20px",
          padding: "2.5rem",
          color: "#fff",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{
          position: "absolute",
          top: "-40px",
          right: "-40px",
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          pointerEvents: "none",
        }} />
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.5rem",
            fontWeight: 400,
            marginBottom: "0.75rem",
            position: "relative",
          }}
        >
          Start Reading
        </h3>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.95rem", marginBottom: "1.5rem", position: "relative" }}>
          Browse our honest reviews and find the right AI tools for your work.
        </p>
        <Link
          href="/articles"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff",
            padding: "0.75rem 1.75rem",
            borderRadius: "12px",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "0.9rem",
            position: "relative",
            transition: "all 0.2s",
          }}
        >
          Browse All Reviews →
        </Link>
      </div>
    </div>
  );
}
