import { getArticles } from "@/lib/api";
import ArticleCard from "@/components/ArticleCard";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

interface Props { params: Promise<{ name: string }>; searchParams: Promise<{ page?: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  return {
    title: `${decodedName} Reviews & Guides`,
    description: `Honest reviews and in-depth guides for ${decodedName} tools. Compare features, pricing, and real user experiences.`,
    openGraph: {
      title: `${decodedName} Reviews | AIToolsHub`,
      description: `Honest reviews and in-depth guides for ${decodedName} tools.`,
    },
  };
}

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params, searchParams }: Props) {
  const { name } = await params;
  const { page: pageStr } = await searchParams;
  const category = decodeURIComponent(name);
  const page = Number(pageStr) || 1;

  const { articles, total, pages } = await getArticles(page, 12, category);
  if (page === 1 && articles.length === 0) notFound();

  const CAT_COLORS: Record<string, string> = {
    "AI Chatbots":"#6c3ce9","AI Coding Tools":"#10b981","AI Writing Tools":"#f59e0b",
    "AI Image Generation":"#ec4899","AI Video Tools":"#3b82f6","AI Audio Tools":"#f43f5e",
    "AI Productivity Tools":"#14b8a6","AI Search & Research":"#8b5cf6",
  };
  const color = CAT_COLORS[category] || "#6c3ce9";

  return (
    <div>
      {/* Category hero */}
      <div style={{ background: `linear-gradient(135deg, ${color}10 0%, var(--bg) 60%, ${color}05 100%)`, borderBottom: "1px solid var(--border)", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Link href="/articles" style={{ color: "var(--text-soft)", textDecoration: "none", fontSize: "0.85rem", marginBottom: "1.25rem", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            <ArrowLeft size={14} /> All Articles
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: `${color}18`, border: `2px solid ${color}35`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>
              🤖
            </div>
            <div>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 400, color: "var(--text-header)", marginBottom: "0.25rem" }}>{category}</h1>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>{total} review{total !== 1 ? "s" : ""} available</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
          {articles.map((a, i) => (
            <div key={a.id} style={{ animation: "fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards", animationDelay: `${i * 0.06}s`, opacity: 0 }}>
              <ArticleCard article={a} />
            </div>
          ))}
        </div>

        {pages > 1 && (
          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            {page > 1 && (
              <Link href={`?page=${page - 1}`} style={{ padding: "0.5rem 1.125rem", border: "1px solid var(--border)", borderRadius: "10px", textDecoration: "none", color: "var(--text)", fontSize: "0.875rem", background: "var(--bg-card)", transition: "all 0.2s" }}>← Prev</Link>
            )}
            {Array.from({ length: Math.min(pages, 7) }, (_, i) => {
              const p = i + 1;
              return (
                <Link key={p} href={`?page=${p}`} style={{ padding: "0.5rem 0.925rem", border: "1px solid", borderColor: p === page ? color : "var(--border)", borderRadius: "10px", textDecoration: "none", color: p === page ? "#fff" : "var(--text)", background: p === page ? color : "var(--bg-card)", fontSize: "0.875rem", fontWeight: p === page ? 700 : 400, transition: "all 0.2s" }}>{p}</Link>
              );
            })}
            {page < pages && (
              <Link href={`?page=${page + 1}`} style={{ padding: "0.5rem 1.125rem", border: "1px solid var(--border)", borderRadius: "10px", textDecoration: "none", color: "var(--text)", fontSize: "0.875rem", background: "var(--bg-card)", transition: "all 0.2s" }}>Next →</Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
