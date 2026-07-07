"use client";
import { useEffect, useState } from "react";
import { List } from "lucide-react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ content }: { content: string }) {
  const [activeId, setActiveId] = useState<string>("");
  const [open, setOpen] = useState(true);

  const headings: Heading[] = content
    .split("\n")
    .filter((line) => line.startsWith("## ") || line.startsWith("### "))
    .map((line) => {
      const level = line.startsWith("### ") ? 3 : 2;
      const text = line.replace(/^#{2,3}\s/, "");
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return { id, text, level };
    });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "14px",
        padding: "1.25rem",
        marginBottom: "1.25rem",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.72rem",
            fontWeight: 700,
            color: "var(--text-soft)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          <List size={14} /> Contents
        </span>
        <span style={{ color: "var(--text-soft)", fontSize: "0.8rem", transition: "transform 0.2s", transform: open ? "rotate(0deg)" : "rotate(180deg)" }}>▾</span>
      </button>

      {open && (
        <nav style={{ marginTop: "1rem" }}>
          {headings.map(({ id, text, level }) => {
            const isActive = activeId === id;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  background: isActive ? "var(--accent-pale)" : "none",
                  border: "none",
                  cursor: "pointer",
                  padding: `0.4rem 0.625rem 0.4rem ${level === 3 ? "1rem" : "0.625rem"}`,
                  fontSize: "0.82rem",
                  lineHeight: 1.5,
                  color: isActive ? "var(--accent)" : "var(--text-muted)",
                  fontWeight: isActive ? 600 : 400,
                  borderRadius: "8px",
                  borderLeft: isActive ? "2px solid var(--accent)" : "2px solid transparent",
                  transition: "all 0.15s",
                  marginBottom: "2px",
                }}
              >
                {text}
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
}
