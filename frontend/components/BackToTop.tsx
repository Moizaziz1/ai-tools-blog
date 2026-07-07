"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        width: "46px",
        height: "46px",
        background: "linear-gradient(135deg, #6c3ce9, #a78bfa)",
        color: "#ffffff",
        border: "none",
        borderRadius: "14px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 8px 24px rgba(108, 60, 233, 0.35)",
        zIndex: 40,
        animation: "fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-4px) scale(1.05)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 32px rgba(108, 60, 233, 0.45)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0) scale(1)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(108, 60, 233, 0.35)";
      }}
    >
      <ArrowUp size={18} />
    </button>
  );
}
