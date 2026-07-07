import Link from "next/link";
import type { Metadata } from "next";
import ArticleCard from "@/components/ArticleCard";
import type { Article } from "@/lib/api";
import { Tag } from "lucide-react";

export const dynamic = "force-dynamic";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface Props {
  params: { tag: string };
  searchParams: { page?: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag);
  return {
    title: `#${tag} — AI Tool Articles`,
    description: `Browse all AI tool articles tagged with "${tag}".`,
  };
}

export default async function TagPage({ params, searchParams }: Props) {
  const tag = decodeURIComponent(params.tag);
  const page = Number(searchParams.page) || 1;

  let articles: Article[] = [];
  let total = 0;
  let pages = 1;

  try {
    const res = await fetch(
      `${API_URL}/api/articles/tag/${encodeURIComponent(tag)}?page=${page}&limit=12`,
      { cache: "no-store" }
    );
    if (res.ok) {
      const data = await res.json();
      articles = data.articles;
      total = data.total;
      pages = data.pages;
    }
  } catch {}

  return (
    <div>
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #ede9e0", padding: "2.5rem 1.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Link href="/articles" style={{ color: "#6b6862", textDecoration: "none", fontSize: "0.82rem", marginBottom: "1rem", display: "inline-block" }}>
            ← All Articles
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: "#e85d2618", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Tag size={20} color="#e85d26" />
            </div>
            <div>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 400, color: "#0f0f0f", marginBottom: "0.2rem" }}>
                #{tag}
              </h1>
              <p style={{ color: "#6b6862", fontSize: "0.875rem" }}>
                {total} article{total !== 1 ? "s" : ""} tagged
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        {articles.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 2rem", color: "#6b6862" }}>
            <p style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>No articles found for #{tag}</p>
            <Link href="/articles" style={{ color: "#e85d26", textDecoration: "none", fontWeight: 600 }}>
              Browse all articles →
            </Link>
          </div>
        ) : (
          <>
            <div className="layout-article-grid" style={{ marginBottom: "2.5rem" }}>
              {articles.map((a: Article, i: number) => (
                <div key={a.id} style={{ animation: "fadeUp 0.4s ease forwards", animationDelay: `${i * 0.05}s`, opacity: 0 }}>
                  <ArticleCard article={a} />
                </div>
              ))}
            </div>

            {pages > 1 && (
              <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
                {page > 1 && (
                  <Link href={`?page=${page - 1}`} style={{ padding: "0.5rem 1rem", border: "1px solid #ede9e0", borderRadius: "8px", textDecoration: "none", color: "#1a1a1a", background: "#fff", fontSize: "0.875rem" }}>← Prev</Link>
                )}
                {Array.from({ length: Math.min(pages, 7) }, (_, i) => {
                  const p = i + 1;
                  return (
                    <Link key={p} href={`?page=${p}`}
                      style={{ padding: "0.5rem 0.875rem", border: "1px solid", borderColor: p === page ? "#e85d26" : "#ede9e0", borderRadius: "8px", textDecoration: "none", color: p === page ? "#fff" : "#1a1a1a", background: p === page ? "#e85d26" : "#fff", fontSize: "0.875rem", fontWeight: p === page ? 700 : 400 }}>{p}</Link>
                  );
                })}
                {page < pages && (
                  <Link href={`?page=${page + 1}`} style={{ padding: "0.5rem 1rem", border: "1px solid #ede9e0", borderRadius: "8px", textDecoration: "none", color: "#1a1a1a", background: "#fff", fontSize: "0.875rem" }}>Next →</Link>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
