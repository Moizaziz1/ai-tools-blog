import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import type { Article } from "@/lib/api";

const CATEGORY_COLORS: Record<string, string> = {
  "AI Chatbots": "#6c3ce9",
  "AI Coding Tools": "#10b981",
  "AI Writing Tools": "#f59e0b",
  "AI Image Generation": "#ec4899",
  "AI Video Tools": "#3b82f6",
  "AI Audio Tools": "#f43f5e",
  "AI Productivity Tools": "#14b8a6",
  "AI Search & Research": "#8b5cf6",
};

export default function ArticleCard({
  article,
  featured = false,
}: {
  article: Article;
  featured?: boolean;
}) {
  const color = CATEGORY_COLORS[article.category] || "#6c3ce9";
  const date = new Date(article.published_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  if (featured) {
    return (
      <Link
        href={`/articles/${article.slug}`}
        className="article-card"
        style={{
          display: "grid",
          textDecoration: "none",
          color: "inherit",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "20px",
          overflow: "hidden",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, ${color}18 0%, ${color}05 100%)`,
            minHeight: "320px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative circles */}
          <div style={{
            position: "absolute",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: `${color}10`,
            top: "10%",
            left: "10%",
            animation: "float 6s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: `${color}08`,
            bottom: "15%",
            right: "15%",
            animation: "float 8s ease-in-out infinite reverse",
          }} />
          <div style={{
            width: "120px",
            height: "120px",
            borderRadius: "28px",
            background: `linear-gradient(135deg, ${color}25, ${color}10)`,
            border: `2px solid ${color}40`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "3rem",
            position: "relative",
            zIndex: 1,
            boxShadow: `0 8px 32px ${color}20`,
          }}>
            {getCategoryEmoji(article.category)}
          </div>
          <div
            style={{
              position: "absolute",
              top: "1.25rem",
              left: "1.25rem",
              background: `linear-gradient(135deg, ${color}, ${color}dd)`,
              color: "#fff",
              padding: "0.3rem 0.75rem",
              borderRadius: "100px",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              boxShadow: `0 4px 12px ${color}40`,
            }}
          >
            FEATURED
          </div>
        </div>
        <div style={{ padding: "2.25rem" }}>
          <span
            style={{
              display: "inline-block",
              background: `${color}15`,
              color: color,
              padding: "0.25rem 0.75rem",
              borderRadius: "100px",
              fontSize: "0.72rem",
              fontWeight: 700,
              marginBottom: "1rem",
              letterSpacing: "0.03em",
            }}
          >
            {article.category}
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.6rem",
              fontWeight: 400,
              lineHeight: 1.25,
              marginBottom: "1rem",
              color: "var(--text-header)",
            }}
          >
            {article.title}
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "0.925rem",
              lineHeight: 1.7,
              marginBottom: "1.5rem",
            }}
          >
            {article.excerpt}
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1rem", borderTop: "1px solid var(--border-soft)" }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", color: "var(--text-soft)", fontSize: "0.82rem" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <Clock size={13} /> {article.reading_time} min read
              </span>
              <span>{date}</span>
            </div>
            <span style={{ color: "var(--accent)", display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.82rem", fontWeight: 600 }}>
              Read <ArrowUpRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="article-card"
      style={{
        display: "block",
        textDecoration: "none",
        color: "inherit",
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        overflow: "hidden",
      }}
    >
      {article.image_url ? (
        <div style={{ height: "180px", overflow: "hidden", background: "var(--bg-hover)" }}>
          <img src={article.image_url} alt={article.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
            className="hover:scale-105"
            onError={e => { (e.target as HTMLImageElement).parentElement!.style.height = "4px"; (e.target as HTMLImageElement).style.display = "none"; }} />
        </div>
      ) : (
        <div style={{ height: "4px", background: `linear-gradient(90deg, ${color}, ${color}88)` }} />
      )}
      <div style={{ padding: "1.375rem 1.5rem 1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
          <span
            style={{
              background: `${color}12`,
              color: color,
              padding: "0.2rem 0.65rem",
              borderRadius: "100px",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.03em",
            }}
          >
            {article.category}
          </span>
          <span style={{ fontSize: "1.5rem" }}>{getCategoryEmoji(article.category)}</span>
        </div>

        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.15rem",
            fontWeight: 400,
            lineHeight: 1.35,
            marginBottom: "0.625rem",
            color: "var(--text-header)",
          }}
        >
          {article.title}
        </h3>

        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "0.875rem",
            lineHeight: 1.65,
            marginBottom: "1.25rem",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {article.excerpt}
        </p>

        {article.tags && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1rem" }}>
            {article.tags.split(",").slice(0, 3).map((t: string) => t.trim()).filter(Boolean).map((tag: string) => (
              <span key={tag}
                style={{ fontSize: "0.68rem", fontWeight: 600, color: "var(--accent)", background: "var(--accent-pale)", padding: "0.2rem 0.55rem", borderRadius: "6px", letterSpacing: "0.02em" }}>
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "1rem",
            borderTop: "1px solid var(--border-soft)",
            color: "var(--text-soft)",
            fontSize: "0.8rem",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <Clock size={12} /> {article.reading_time} min
          </span>
          <span>{date}</span>
        </div>
      </div>
    </Link>
  );
}

function getCategoryEmoji(category: string) {
  const map: Record<string, string> = {
    "AI Chatbots": "💬",
    "AI Coding Tools": "⌨️",
    "AI Writing Tools": "✍️",
    "AI Image Generation": "🎨",
    "AI Video Tools": "🎬",
    "AI Audio Tools": "🎵",
    "AI Productivity Tools": "⚡",
    "AI Search & Research": "🔍",
  };
  return map[category] || "🤖";
}
