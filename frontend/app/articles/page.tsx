import { getArticles, getCategories } from "@/lib/api";
import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "All AI Tool Reviews",
  description: "Browse our complete collection of honest AI tool reviews. Compare ChatGPT, Claude, Midjourney, and dozens of other AI tools across coding, writing, image generation, and more.",
  openGraph: {
    title: "All AI Tool Reviews | AIToolsHub",
    description: "Browse our complete collection of honest AI tool reviews across coding, writing, image generation, video, and more.",
  },
};
export const dynamic = "force-dynamic";

interface Props { searchParams: Promise<{ page?: string; category?: string }> }

export default async function ArticlesPage({ searchParams }: Props) {
  const { page: pageStr, category } = await searchParams;
  const page = Number(pageStr) || 1;

  const [{ articles, total, pages }, categories] = await Promise.all([
    getArticles(page, 12, category),
    getCategories(),
  ]);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <Link href="/" style={{ color: "var(--text-soft)", textDecoration: "none", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "1.5rem" }}>
          <ArrowLeft size={14} /> Home
        </Link>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.25rem", fontWeight: 400, color: "var(--text-header)", marginBottom: "0.5rem" }}>
          {category ? `${category}` : "All AI Tool Reviews"}
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
          {total} article{total !== 1 ? "s" : ""} {category ? `in ${category}` : "across all categories"}
        </p>
      </div>

      <div className="layout-two-col" style={{ gap: "2.5rem" }}>
        {/* Articles */}
        <div>
          {articles.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 2rem", color: "var(--text-muted)" }}>
              <p style={{ fontSize: "1.1rem" }}>No articles found.</p>
              <Link href="/articles" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600, marginTop: "1rem", display: "inline-block" }}>View all articles</Link>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {articles.map((a, i) => (
                <div key={a.id} style={{ animation: "fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards", animationDelay: `${i * 0.05}s`, opacity: 0 }}>
                  <ArticleCard article={a} />
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pages > 1 && (
            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginTop: "2.5rem", flexWrap: "wrap" }}>
              {page > 1 && (
                <Link href={`?page=${page - 1}${category ? `&category=${encodeURIComponent(category)}` : ""}`}
                  style={{ padding: "0.5rem 1.125rem", border: "1px solid var(--border)", borderRadius: "10px", textDecoration: "none", color: "var(--text)", fontSize: "0.875rem", background: "var(--bg-card)", transition: "all 0.2s" }}>
                  ← Prev
                </Link>
              )}
              {Array.from({ length: Math.min(pages, 7) }, (_, i) => {
                const p = i + 1;
                return (
                  <Link key={p} href={`?page=${p}${category ? `&category=${encodeURIComponent(category)}` : ""}`}
                    style={{ padding: "0.5rem 0.925rem", border: "1px solid", borderColor: p === page ? "var(--accent)" : "var(--border)", borderRadius: "10px", textDecoration: "none", color: p === page ? "#fff" : "var(--text)", background: p === page ? "var(--accent)" : "var(--bg-card)", fontSize: "0.875rem", fontWeight: p === page ? 700 : 400, transition: "all 0.2s" }}>
                    {p}
                  </Link>
                );
              })}
              {page < pages && (
                <Link href={`?page=${page + 1}${category ? `&category=${encodeURIComponent(category)}` : ""}`}
                  style={{ padding: "0.5rem 1.125rem", border: "1px solid var(--border)", borderRadius: "10px", textDecoration: "none", color: "var(--text)", fontSize: "0.875rem", background: "var(--bg-card)", transition: "all 0.2s" }}>
                  Next →
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="layout-sidebar-sticky">
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "1.375rem" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 400, marginBottom: "1rem", color: "var(--text-header)" }}>Categories</h3>
            <Link href="/articles"
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.6rem 0.875rem", borderRadius: "10px", textDecoration: "none", color: !category ? "var(--accent)" : "var(--text)", fontSize: "0.875rem", background: !category ? "var(--accent-pale)" : "var(--bg-hover)", fontWeight: !category ? 700 : 400, marginBottom: "0.3rem", transition: "all 0.2s" }}>
              All Categories
            </Link>
            {categories.map(cat => {
              const active = cat.category === category;
              const colors: Record<string, string> = { "AI Chatbots": "#6c3ce9", "AI Coding Tools": "#10b981", "AI Writing Tools": "#f59e0b", "AI Image Generation": "#ec4899", "AI Video Tools": "#3b82f6", "AI Audio Tools": "#f43f5e", "AI Productivity Tools": "#14b8a6", "AI Search & Research": "#8b5cf6" };
              const color = colors[cat.category] || "#6c3ce9";
              return (
                <Link key={cat.category} href={`/articles?category=${encodeURIComponent(cat.category)}`}
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.6rem 0.875rem", borderRadius: "10px", textDecoration: "none", color: active ? color : "var(--text)", fontSize: "0.875rem", background: active ? `${color}12` : "transparent", fontWeight: active ? 600 : 400, marginBottom: "0.15rem", transition: "all 0.2s" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: color, flexShrink: 0 }} />
                    {cat.category}
                  </span>
                  <span style={{ background: `${color}18`, color, borderRadius: "100px", padding: "0.1rem 0.5rem", fontSize: "0.7rem", fontWeight: 700 }}>{cat.count}</span>
                </Link>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}
