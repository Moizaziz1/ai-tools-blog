"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { adminGetArticles, adminDeleteArticle, adminUpdateArticle } from "@/lib/api";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import Link from "next/link";
import { Plus, Edit3, Trash2, Eye, EyeOff, Loader2, Search, CheckSquare, Square, ChevronDown } from "lucide-react";
import type { Article } from "@/lib/api";

export const dynamic = "force-dynamic";

export default function AdminArticlesPage() {
  const { token, isLoading } = useAuth();
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkMenuOpen, setBulkMenuOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");

  useEffect(() => {
    if (!isLoading && !token) { router.push("/admin/login"); return; }
    if (!token) return;
    adminGetArticles(token)
      .then(setArticles)
      .catch(() => router.push("/admin/login"))
      .finally(() => setLoading(false));
  }, [token, isLoading, router]);

  const filtered = articles.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase()) ||
      a.slug.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || (filterStatus === "published" ? a.is_published : !a.is_published);
    return matchSearch && matchStatus;
  });

  const allSelected = filtered.length > 0 && filtered.every(a => selected.has(a.id));
  const someSelected = selected.size > 0;

  const toggleAll = () => {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(filtered.map(a => a.id)));
  };

  const toggleOne = (id: number) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleDelete = async (id: number) => {
    if (!token || !confirm("Delete this article?")) return;
    setDeleteId(id);
    try { await adminDeleteArticle(token, id); setArticles(prev => prev.filter(a => a.id !== id)); setSelected(prev => { const n = new Set(prev); n.delete(id); return n; }); }
    catch { alert("Failed to delete"); }
    finally { setDeleteId(null); }
  };

  const togglePublish = async (article: Article) => {
    if (!token) return;
    try {
      const updated = await adminUpdateArticle(token, article.id, { is_published: !article.is_published });
      setArticles(prev => prev.map(a => a.id === article.id ? { ...a, is_published: updated.is_published } : a));
    } catch { alert("Failed to update"); }
  };

  const bulkAction = async (action: "publish" | "unpublish" | "delete") => {
    if (!token || selected.size === 0) return;
    if (action === "delete" && !confirm(`Delete ${selected.size} articles?`)) return;
    setBulkLoading(true);
    setBulkMenuOpen(false);
    try {
      const ids = Array.from(selected);
      await Promise.all(ids.map(id => {
        if (action === "delete") return adminDeleteArticle(token, id);
        return adminUpdateArticle(token, id, { is_published: action === "publish" });
      }));
      if (action === "delete") {
        setArticles(prev => prev.filter(a => !selected.has(a.id)));
      } else {
        setArticles(prev => prev.map(a => selected.has(a.id) ? { ...a, is_published: action === "publish" } : a));
      }
      setSelected(new Set());
    } catch { alert("Bulk action failed"); }
    finally { setBulkLoading(false); }
  };

  const CAT_COLORS: Record<string, string> = {
    "AI Chatbots": "#6c3ce9", "AI Coding Tools": "#10b981", "AI Writing Tools": "#f59e0b",
    "AI Image Generation": "#ec4899", "AI Video Tools": "#3b82f6", "AI Audio Tools": "#f43f5e",
    "AI Productivity Tools": "#14b8a6", "AI Search & Research": "#8b5cf6",
  };

  if (isLoading || loading) return (
    <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center" }}>
      <Loader2 size={24} color="#a78bfa" style={{ animation: "spin 1s linear infinite" }} />
    </div>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: "2rem", overflowY: "auto" as const, background: "#f8f7fc" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", fontWeight: 400, color: "#0a0a12" }}>All Articles</h1>
            <p style={{ color: "#64607a", fontSize: "0.875rem" }}>{articles.length} total · {articles.filter(a => a.is_published).length} published · {articles.filter(a => !a.is_published).length} drafts</p>
          </div>
          <Link href="/admin/articles/new" style={{ background: "linear-gradient(135deg, #6c3ce9, #a78bfa)", color: "#fff", padding: "0.65rem 1.375rem", borderRadius: "10px", textDecoration: "none", fontWeight: 600, fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.4rem", boxShadow: "0 4px 12px rgba(108, 60, 233, 0.25)" }}>
            <Plus size={16} /> New Article
          </Link>
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap" as const, alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1, minWidth: "200px", maxWidth: "360px" }}>
            <Search size={15} style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "#9892ad" }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles…"
              className="input-focus"
              style={{ width: "100%", padding: "0.6rem 1rem 0.6rem 2.5rem", border: "1.5px solid #e8e4f0", borderRadius: "10px", fontSize: "0.875rem", outline: "none", background: "#fff", color: "#1a1625" }} />
          </div>

          <div style={{ display: "flex", gap: "0.3rem", background: "#fff", border: "1px solid #e8e4f0", borderRadius: "10px", padding: "0.25rem" }}>
            {(["all", "published", "draft"] as const).map(s => (
              <button key={s} onClick={() => setFilterStatus(s)}
                style={{ padding: "0.4rem 0.875rem", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600, background: filterStatus === s ? "#0a0a12" : "transparent", color: filterStatus === s ? "#fff" : "#64607a", transition: "all 0.15s", textTransform: "capitalize" as const }}>
                {s}
              </button>
            ))}
          </div>

          {someSelected && (
            <div style={{ position: "relative", marginLeft: "auto" }}>
              <button onClick={() => setBulkMenuOpen(!bulkMenuOpen)} disabled={bulkLoading}
                style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.55rem 1rem", background: "#0a0a12", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "0.82rem", fontWeight: 600 }}>
                {bulkLoading ? <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> : null}
                {selected.size} selected <ChevronDown size={13} />
              </button>
              {bulkMenuOpen && (
                <div style={{ position: "absolute", top: "calc(100% + 0.4rem)", right: 0, background: "#fff", border: "1px solid #e8e4f0", borderRadius: "10px", padding: "0.375rem", minWidth: "170px", zIndex: 10, boxShadow: "0 8px 30px rgba(0,0,0,0.1)" }}>
                  {[
                    { label: "Publish all", action: "publish" as const, color: "#10b981" },
                    { label: "Unpublish all", action: "unpublish" as const, color: "#f59e0b" },
                    { label: "Delete all", action: "delete" as const, color: "#f43f5e" },
                  ].map(({ label, action, color }) => (
                    <button key={action} onClick={() => bulkAction(action)}
                      style={{ display: "block", width: "100%", textAlign: "left" as const, padding: "0.5rem 0.75rem", border: "none", background: "none", cursor: "pointer", fontSize: "0.82rem", fontWeight: 600, color, borderRadius: "8px" }}>
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Table */}
        <div style={{ background: "#fff", border: "1px solid #e8e4f0", borderRadius: "16px", overflow: "hidden" }}>
          <div style={{ overflowX: "auto" as const }}>
            <table style={{ width: "100%", borderCollapse: "collapse" as const }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #f0ede8", background: "#faf9ff" }}>
                  <th style={{ padding: "0.8rem 1rem", width: "40px" }}>
                    <button onClick={toggleAll} style={{ background: "none", border: "none", cursor: "pointer", color: allSelected ? "#6c3ce9" : "#9892ad", display: "flex" }}>
                      {allSelected ? <CheckSquare size={16} /> : <Square size={16} />}
                    </button>
                  </th>
                  {["Title", "Category", "Status", "Date", "Actions"].map(h => (
                    <th key={h} style={{ padding: "0.8rem 1rem", textAlign: "left" as const, fontSize: "0.72rem", fontWeight: 700, color: "#9892ad", textTransform: "uppercase" as const, letterSpacing: "0.06em", whiteSpace: "nowrap" as const }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(article => {
                  const isSelected = selected.has(article.id);
                  const color = CAT_COLORS[article.category] || "#64607a";
                  return (
                    <tr key={article.id}
                      className="table-row-hover"
                      style={{ borderBottom: "1px solid #f8f6f3", background: isSelected ? "rgba(108, 60, 233, 0.04)" : "transparent", transition: "background 0.1s" }}
                    >
                      <td style={{ padding: "0.875rem 1rem" }}>
                        <button onClick={() => toggleOne(article.id)}
                          style={{ background: "none", border: "none", cursor: "pointer", color: isSelected ? "#6c3ce9" : "#9892ad", display: "flex" }}>
                          {isSelected ? <CheckSquare size={15} /> : <Square size={15} />}
                        </button>
                      </td>
                      <td style={{ padding: "0.875rem 1rem", maxWidth: "280px" }}>
                        <p style={{ fontWeight: 600, fontSize: "0.875rem", color: "#0a0a12", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const, marginBottom: "0.15rem" }}>{article.title}</p>
                        <p style={{ fontSize: "0.72rem", color: "#9892ad", fontFamily: "var(--font-mono)" }}>{article.slug}</p>
                      </td>
                      <td style={{ padding: "0.875rem 1rem", whiteSpace: "nowrap" as const }}>
                        <span style={{ fontSize: "0.72rem", fontWeight: 700, color, background: `${color}12`, padding: "0.2rem 0.6rem", borderRadius: "6px" }}>
                          {article.category}
                        </span>
                      </td>
                      <td style={{ padding: "0.875rem 1rem" }}>
                        <button onClick={() => togglePublish(article)}
                          style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", fontWeight: 600, color: article.is_published ? "#10b981" : "#f59e0b", background: article.is_published ? "#d1fae5" : "#fef3c7", padding: "0.2rem 0.6rem", borderRadius: "100px", border: "none", cursor: "pointer" }}>
                          {article.is_published ? "Published" : "Draft"}
                        </button>
                      </td>
                      <td style={{ padding: "0.875rem 1rem", fontSize: "0.8rem", color: "#64607a", whiteSpace: "nowrap" as const }}>
                        {new Date(article.published_at).toLocaleDateString()}
                      </td>
                      <td style={{ padding: "0.875rem 1rem" }}>
                        <div style={{ display: "flex", gap: "0.35rem" }}>
                          <Link href={`/articles/${article.slug}`} target="_blank"
                            style={{ padding: "0.35rem", borderRadius: "8px", background: "#f3f1fa", color: "#64607a", display: "flex", alignItems: "center", textDecoration: "none" }} title="View live">
                            <Eye size={13} />
                          </Link>
                          <Link href={`/admin/articles/${article.id}`}
                            style={{ padding: "0.35rem", borderRadius: "8px", background: "rgba(108, 60, 233, 0.08)", color: "#6c3ce9", display: "flex", alignItems: "center", textDecoration: "none" }} title="Edit">
                            <Edit3 size={13} />
                          </Link>
                          <button onClick={() => handleDelete(article.id)} disabled={deleteId === article.id}
                            style={{ padding: "0.35rem", borderRadius: "8px", background: "#ffe4e6", color: "#f43f5e", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }} title="Delete">
                            {deleteId === article.id ? <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} /> : <Trash2 size={13} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div style={{ padding: "3rem", textAlign: "center", color: "#64607a" }}>
                {search ? `No articles matching "${search}"` : "No articles yet."}
              </div>
            )}
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ marginTop: "1rem", display: "flex", gap: "1.5rem", fontSize: "0.78rem", color: "#9892ad" }}>
          <span>Showing {filtered.length} of {articles.length}</span>
          {someSelected && <span style={{ color: "#6c3ce9", fontWeight: 600 }}>{selected.size} selected</span>}
        </div>
      </main>
    </div>
  );
}
