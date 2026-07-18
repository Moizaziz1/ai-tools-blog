"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "General inquiry", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "General inquiry", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-soft)", marginBottom: "0.5rem", textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>Name</label>
          <input type="text" placeholder="Your name" required
            className="input-focus"
            style={{ width: "100%", padding: "0.8rem 1rem", border: "1.5px solid var(--border)", borderRadius: "10px", fontSize: "0.925rem", outline: "none", color: "var(--text)", background: "var(--bg-card)" }}
            value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-soft)", marginBottom: "0.5rem", textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>Email</label>
          <input type="email" placeholder="your@email.com" required
            className="input-focus"
            style={{ width: "100%", padding: "0.8rem 1rem", border: "1.5px solid var(--border)", borderRadius: "10px", fontSize: "0.925rem", outline: "none", color: "var(--text)", background: "var(--bg-card)" }}
            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </div>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-soft)", marginBottom: "0.5rem", textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>Subject</label>
        <select className="input-focus" style={{ width: "100%", padding: "0.8rem 1rem", border: "1.5px solid var(--border)", borderRadius: "10px", fontSize: "0.925rem", outline: "none", color: "var(--text)", background: "var(--bg-card)", cursor: "pointer" }}
          value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}>
          <option>General inquiry</option>
          <option>Factual correction</option>
          <option>Tool suggestion</option>
          <option>Technical issue</option>
          <option>Other</option>
        </select>
      </div>
      <div style={{ marginBottom: "1.5rem" }}>
        <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-soft)", marginBottom: "0.5rem", textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>Message</label>
        <textarea rows={5} placeholder="What would you like to tell us?" required
          className="input-focus"
          style={{ width: "100%", padding: "0.8rem 1rem", border: "1.5px solid var(--border)", borderRadius: "10px", fontSize: "0.925rem", outline: "none", color: "var(--text)", background: "var(--bg-card)", resize: "vertical" as const, lineHeight: 1.7 }}
          value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
      </div>
      {status === "success" && (
        <div style={{ background: "#10b98118", border: "1px solid #10b981", borderRadius: "10px", padding: "0.875rem 1.125rem", marginBottom: "1.25rem", fontSize: "0.85rem", color: "#10b981" }}>
          Thank you for your message! We&apos;ll get back to you within 48 hours.
        </div>
      )}
      {status === "error" && (
        <div style={{ background: "#ef444418", border: "1px solid #ef4444", borderRadius: "10px", padding: "0.875rem 1.125rem", marginBottom: "1.25rem", fontSize: "0.85rem", color: "#ef4444" }}>
          Something went wrong. Please email us directly at{" "}
          <a href="mailto:hello@aitoolshub.com" style={{ color: "#ef4444", fontWeight: 700 }}>hello@aitoolshub.com</a>
        </div>
      )}
      <button type="submit" className="btn-primary" disabled={status === "loading"}>
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
