"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { adminGetArticles, adminUpdateArticle } from "@/lib/api";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import ArticleEditor from "@/components/ArticleEditor";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import type { Article } from "@/lib/api";

export const dynamic = "force-dynamic";

interface Props { params: { id: string } }

export default function EditArticlePage({ params }: Props) {
  const { token, isLoading } = useAuth();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !token) { router.push("/admin/login"); return; }
    if (!token) return;
    adminGetArticles(token)
      .then(articles => {
        const found = articles.find(a => a.id === Number(params.id));
        if (!found) router.push("/admin/dashboard");
        else setArticle(found);
      })
      .catch(() => router.push("/admin/login"))
      .finally(() => setLoading(false));
  }, [token, isLoading, params.id, router]);

  const handleSave = async (data: Partial<Article>) => {
    if (!token || !article) throw new Error("Not authenticated");
    await adminUpdateArticle(token, article.id, data);
  };

  if (isLoading || loading || !article) return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8f7fc" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1 }}>
        <Loader2 size={24} color="#a78bfa" style={{ animation: "spin 1s linear infinite" }} />
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: "2rem", overflowY: "auto" as const }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
          <Link href="/admin/dashboard" style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--text-soft)", textDecoration: "none", fontSize: "0.85rem" }}>
            <ArrowLeft size={14} /> Back
          </Link>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", fontWeight: 400, color: "var(--text-header)" }}>Edit Article</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{article.title}</p>
          </div>
          <Link href={`/articles/${article.slug}`} target="_blank"
            style={{ fontSize: "0.82rem", color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>
            View live →
          </Link>
        </div>
        <ArticleEditor mode="edit" initial={article} onSave={handleSave} />
      </main>
    </div>
  );
}
