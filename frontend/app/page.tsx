import { getArticles, getCategories } from "@/lib/api";
import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, Zap } from "lucide-react";

export const dynamic = "force-dynamic";

const CAT_COLORS: Record<string, string> = {
  "AI Chatbots": "#6c3ce9", "AI Coding Tools": "#10b981",
  "AI Writing Tools": "#f59e0b", "AI Image Generation": "#ec4899",
  "AI Video Tools": "#3b82f6", "AI Audio Tools": "#f43f5e",
  "AI Productivity Tools": "#14b8a6", "AI Search & Research": "#8b5cf6",
};

function catEmoji(c: string) {
  return ({"AI Chatbots":"💬","AI Coding Tools":"⌨️","AI Writing Tools":"✍️","AI Image Generation":"🎨","AI Video Tools":"🎬","AI Audio Tools":"🎵","AI Productivity Tools":"⚡","AI Search & Research":"🔍"} as Record<string,string>)[c]||"🤖";
}

export default async function HomePage() {
  const [{ articles }, categories] = await Promise.all([getArticles(1,13), getCategories()]);
  const featured = articles[0];
  const grid = articles.slice(1, 7);
  const list = articles.slice(7, 13);

  return (
    <div>
      {/* Hero */}
      <section style={{
        position: "relative",
        overflow: "hidden",
        padding: "5rem 1.5rem 4rem",
        textAlign: "center",
        background: "linear-gradient(135deg, var(--bg) 0%, var(--bg-card) 50%, var(--bg) 100%)",
      }}>
        {/* Animated Background Elements */}
        <div style={{
          position: "absolute",
          top: "-50%",
          left: "-20%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
          animation: "float 8s ease-in-out infinite",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute",
          bottom: "-30%",
          right: "-10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)",
          animation: "float 10s ease-in-out infinite reverse",
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: "720px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "var(--accent-pale)",
            border: "1px solid var(--accent)",
            color: "var(--accent)",
            padding: "0.4rem 1rem",
            borderRadius: "100px",
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.04em",
            marginBottom: "1.75rem",
            textTransform: "uppercase",
          }}>
            <Sparkles size={14} /> Honest AI Tool Reviews
          </div>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.5rem, 5.5vw, 4rem)",
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: "1.5rem",
            color: "var(--text-header)",
          }}>
            Find the Right AI Tool
            <br />
            <span className="gradient-text">for Your Work</span>
          </h1>
          <p style={{
            color: "var(--text-muted)",
            fontSize: "1.1rem",
            lineHeight: 1.75,
            marginBottom: "2.5rem",
            maxWidth: "560px",
            margin: "0 auto 2.5rem",
          }}>
            Real reviews from real users. No hype, no filler — just practical guides on ChatGPT, Claude, Midjourney, Cursor, and every AI tool that matters.
          </p>
          <div style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/articles" className="btn-primary" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              Browse All Reviews <ArrowRight size={16} />
            </Link>
            <Link href="/search" className="btn-secondary" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <Zap size={15} /> Search Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section style={{
        background: "var(--bg-card)",
        borderBottom: "1px solid var(--border)",
        padding: "1.25rem 1.5rem",
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          gap: "3rem",
          flexWrap: "wrap",
        }}>
          {[
            { label: "Tools Reviewed", value: "10+", icon: "🛠️" },
            { label: "Categories", value: "8", icon: "📂" },
            { label: "Honest Reviews", value: "100%", icon: "✅" },
            { label: "No Sponsored Content", value: "Never", icon: "🚫" },
          ].map(({ label, value, icon }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
              <span style={{ fontSize: "1.25rem" }}>{icon}</span>
              <div>
                <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-header)", lineHeight: 1 }}>{value}</p>
                <p style={{ fontSize: "0.72rem", color: "var(--text-soft)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Category strip */}
      <section style={{ background: "var(--bg-card)", borderBottom: "1px solid var(--border)", overflowX: "auto" as const }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", display: "flex", gap: "0.25rem", alignItems: "stretch" }}>
          <Link href="/articles" style={{ padding: "0.875rem 1.25rem", textDecoration: "none", color: "var(--accent)", fontWeight: 700, fontSize: "0.82rem", whiteSpace: "nowrap" as const, borderBottom: `2px solid var(--accent)` }}>All</Link>
          {categories.map(cat => {
            const color = CAT_COLORS[cat.category] || "#6c3ce9";
            return (
              <Link key={cat.category} href={`/category/${encodeURIComponent(cat.category)}`}
                className="cat-filter-link"
                style={{ padding: "0.875rem 1rem", textDecoration: "none", color: "var(--text-muted)", fontSize: "0.82rem", fontWeight: 500, whiteSpace: "nowrap" as const, borderBottom: "2px solid transparent", display: "flex", alignItems: "center", gap: "0.5rem", transition: "color 0.2s" }}
              >
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: color, flexShrink: 0 }} />
                {cat.category}
                <span style={{ background: "var(--bg-hover)", color: "var(--text-soft)", borderRadius: "100px", padding: "0.05rem 0.45rem", fontSize: "0.68rem", fontWeight: 600 }}>{cat.count}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3.5rem 1.5rem" }}>
        {/* Featured */}
        {featured && (
          <section style={{ marginBottom: "4rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
              <TrendingUp size={18} style={{ color: "var(--accent)" }} />
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 400, color: "var(--text-header)" }}>Featured Review</h2>
            </div>
            <ArticleCard article={featured} featured />
          </section>
        )}

        {/* Grid */}
        {grid.length > 0 && (
          <section style={{ marginBottom: "4rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 400, color: "var(--text-header)" }}>Recent Reviews</h2>
              <Link href="/articles" className="view-all-link" style={{ color: "var(--accent)", textDecoration: "none", fontSize: "0.85rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.3rem", transition: "gap 0.2s" }}
              >View all <ArrowRight size={14} /></Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: "1.5rem" }}>
              {grid.map((a, i) => (
                <div key={a.id} style={{ animation: `fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards`, animationDelay: `${i * 0.07}s`, opacity: 0 }}>
                  <ArticleCard article={a} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* List + Sidebar */}
        <div className="layout-two-col">
          <section>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 400, color: "var(--text-header)", marginBottom: "1.5rem" }}>More Articles</h2>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.875rem" }}>
              {list.map(a => (
                <Link key={a.id} href={`/articles/${a.slug}`} className="article-card"
                  style={{ display: "flex", gap: "1rem", textDecoration: "none", color: "inherit", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "14px", padding: "1.125rem 1.375rem" }}>
                  <span style={{ fontSize: "1.75rem", flexShrink: 0 }}>{catEmoji(a.category)}</span>
                  <div style={{ minWidth: 0 }}>
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, color: CAT_COLORS[a.category] || "#6c3ce9", letterSpacing: "0.05em", textTransform: "uppercase" as const }}>{a.category}</span>
                    <h3 style={{ fontWeight: 600, fontSize: "0.95rem", lineHeight: 1.4, color: "var(--text-header)", marginTop: "0.25rem", marginBottom: "0.35rem" }}>{a.title}</h3>
                    <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: 1.55, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>{a.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <aside className="layout-sidebar-sticky">
            {/* Categories */}
            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "1.375rem", marginBottom: "1.25rem" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 400, marginBottom: "1rem", color: "var(--text-header)" }}>Browse by Category</h3>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.375rem" }}>
                {categories.map(cat => {
                  const color = CAT_COLORS[cat.category] || "#6c3ce9";
                  return (
                    <Link key={cat.category} href={`/category/${encodeURIComponent(cat.category)}`}
                      className="sidebar-cat-link"
                      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.55rem 0.875rem", borderRadius: "10px", textDecoration: "none", color: "var(--text)", fontSize: "0.85rem", background: "var(--bg-hover)", transition: "all 0.2s" }}
                    >
                      <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: color, flexShrink: 0 }} />
                        {cat.category}
                      </span>
                      <span style={{ background: `${color}18`, color, borderRadius: "100px", padding: "0.1rem 0.5rem", fontSize: "0.72rem", fontWeight: 700 }}>{cat.count}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* About Card */}
            <div style={{
              background: "linear-gradient(135deg, var(--accent), #4f39c7)",
              border: "1px solid var(--border)",
              borderRadius: "16px",
              padding: "1.5rem",
              color: "#fff",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute",
                top: "-30px",
                right: "-30px",
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
                pointerEvents: "none",
              }} />
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 400, marginBottom: "0.75rem", position: "relative" }}>About AIToolsHub</h3>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.7, marginBottom: "1.25rem", position: "relative" }}>We test AI tools daily and write honest, in-depth reviews. No sponsored content — just real experiences.</p>
              <Link href="/about" className="learn-more-btn" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", color: "#fff", padding: "0.6rem 1.125rem", borderRadius: "10px", textDecoration: "none", fontSize: "0.82rem", fontWeight: 600, transition: "all 0.2s", position: "relative", border: "1px solid rgba(255,255,255,0.2)" }}
              >Learn More <ArrowRight size={14} /></Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
