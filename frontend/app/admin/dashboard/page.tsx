"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { adminGetStats, adminGetArticles, adminDeleteArticle } from "@/lib/api";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import Link from "next/link";
import { FileText, BookOpen, FolderOpen, Edit3, Trash2, Plus, Loader2, Eye, EyeOff } from "lucide-react";
import type { Article, Stats } from "@/lib/api";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  const { token, isLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    if (!isLoading && !token) { router.push("/admin/login"); return; }
    if (!token) return;
    Promise.all([adminGetStats(token), adminGetArticles(token)])
      .then(([s, a]) => { setStats(s); setArticles(a); })
      .catch(() => router.push("/admin/login"))
      .finally(() => setLoading(false));
  }, [token, isLoading, router]);

  const handleDelete = async (id: number) => {
    if (!token || !confirm("Delete this article?")) return;
    setDeleteId(id);
    try { await adminDeleteArticle(token, id); setArticles(prev => prev.filter(a => a.id !== id)); }
    catch { alert("Failed to delete"); }
    finally { setDeleteId(null); }
  };

  const togglePublish = async (article: Article) => {
    if (!token) return;
    try {
      const updated = await (await import("@/lib/api")).adminUpdateArticle(token, article.id, { is_published: !article.is_published });
      setArticles(prev => prev.map(a => a.id === article.id ? { ...a, is_published: updated.is_published } : a));
    } catch { alert("Failed to update"); }
  };

  if (isLoading || loading) return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0a12", alignItems: "center", justifyContent: "center" }}>
      <Loader2 size={24} color="#a78bfa" style={{ animation: "spin 1s linear infinite" }} />
    </div>
  );

  const statCards = [
    { label: "Total Articles", value: stats?.total ?? 0, icon: FileText, color: "#6c3ce9" },
    { label: "Published", value: stats?.published ?? 0, icon: BookOpen, color: "#10b981" },
    { label: "Drafts", value: stats?.drafts ?? 0, icon: Edit3, color: "#f59e0b" },
    { label: "Categories", value: stats?.categories ?? 0, icon: FolderOpen, color: "#ec4899" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8f7fc" }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: "2rem", overflowY: "auto" as const }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", fontWeight: 400, color: "#0a0a12", marginBottom: "0.25rem" }}>Dashboard</h1>
            <p style={{ color: "#64607a", fontSize: "0.875rem" }}>Welcome back! Manage your AI tools articles here.</p>
          </div>
          <Link href="/admin/articles/new"
            style={{ background: "linear-gradient(135deg, #6c3ce9, #a78bfa)", color: "#fff", padding: "0.65rem 1.375rem", borderRadius: "10px", textDecoration: "none", fontWeight: 600, fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.4rem", boxShadow: "0 4px 12px rgba(108, 60, 233, 0.25)", transition: "all 0.2s" }}>
            <Plus size={16} /> New Article
          </Link>
        </div>

        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
          {statCards.map(({ label, value, icon: Icon, color }) => (
            <div key={label} style={{ background: "#fff", border: "1px solid #e8e4f0", borderRadius: "14px", padding: "1.25rem", transition: "all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "#9892ad", textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>{label}</p>
                <div style={{ background: `${color}12`, borderRadius: "10px", padding: "0.35rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={15} color={color} />
                </div>
              </div>
              <p style={{ fontSize: "2rem", fontWeight: 700, color: "#0a0a12", lineHeight: 1 }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Articles Table */}
        <div style={{ background: "#fff", border: "1px solid #e8e4f0", borderRadius: "16px", overflow: "hidden" }}>
          <div style={{ padding: "1.375rem 1.5rem", borderBottom: "1px solid #e8e4f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 400, color: "#0a0a12" }}>All Articles</h2>
            <span style={{ fontSize: "0.8rem", color: "#9892ad" }}>{articles.length} total</span>
          </div>
          <div style={{ overflowX: "auto" as const }}>
            <table style={{ width: "100%", borderCollapse: "collapse" as const }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #f0ede8" }}>
                  {["Title", "Category", "Status", "Date", "Actions"].map(h => (
                    <th key={h} style={{ padding: "0.8rem 1.5rem", textAlign: "left" as const, fontSize: "0.72rem", fontWeight: 700, color: "#9892ad", textTransform: "uppercase" as const, letterSpacing: "0.06em", whiteSpace: "nowrap" as const }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {articles.map(article => (
                  <tr key={article.id} style={{ borderBottom: "1px solid #f8f6f3", transition: "background 0.1s" }} onMouseEnter={e => (e.currentTarget.style.background = "#faf9ff")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                    <td style={{ padding: "1rem 1.5rem", maxWidth: "320px" }}>
                      <p style={{ fontWeight: 600, fontSize: "0.875rem", color: "#0a0a12", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const, marginBottom: "0.2rem" }}>{article.title}</p>
                      <p style={{ fontSize: "0.75rem", color: "#9892ad" }}>{article.slug}</p>
                    </td>
                    <td style={{ padding: "1rem 1.5rem", whiteSpace: "nowrap" as const }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#64607a", background: "#f3f1fa", padding: "0.2rem 0.55rem", borderRadius: "6px" }}>{article.category}</span>
                    </td>
                    <td style={{ padding: "1rem 1.5rem" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", fontWeight: 600, color: article.is_published ? "#10b981" : "#f59e0b", background: article.is_published ? "#d1fae5" : "#fef3c7", padding: "0.2rem 0.65rem", borderRadius: "100px" }}>
                        {article.is_published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td style={{ padding: "1rem 1.5rem", fontSize: "0.8rem", color: "#64607a", whiteSpace: "nowrap" as const }}>
                      {new Date(article.published_at).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "1rem 1.5rem" }}>
                      <div style={{ display: "flex", gap: "0.4rem" }}>
                        <Link href={`/articles/${article.slug}`} target="_blank"
                          style={{ padding: "0.4rem", borderRadius: "8px", background: "#f3f1fa", color: "#64607a", display: "flex", alignItems: "center", textDecoration: "none", transition: "all 0.2s" }} title="View">
                          <Eye size={14} />
                        </Link>
                        <button onClick={() => togglePublish(article)}
                          style={{ padding: "0.4rem", borderRadius: "8px", background: "#f3f1fa", color: "#64607a", border: "none", cursor: "pointer", display: "flex", alignItems: "center", transition: "all 0.2s" }} title={article.is_published ? "Unpublish" : "Publish"}>
                          {article.is_published ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                        <Link href={`/admin/articles/${article.id}`}
                          style={{ padding: "0.4rem", borderRadius: "8px", background: "rgba(108, 60, 233, 0.08)", color: "#6c3ce9", display: "flex", alignItems: "center", textDecoration: "none", transition: "all 0.2s" }} title="Edit">
                          <Edit3 size={14} />
                        </Link>
                        <button onClick={() => handleDelete(article.id)} disabled={deleteId === article.id}
                          style={{ padding: "0.4rem", borderRadius: "8px", background: "#ffe4e6", color: "#f43f5e", border: "none", cursor: "pointer", display: "flex", alignItems: "center", transition: "all 0.2s" }} title="Delete">
                          {deleteId === article.id ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : <Trash2 size={14} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
