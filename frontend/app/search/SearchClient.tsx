"use client";
import { useState, useEffect } from "react";
import { getArticles, type Article } from "@/lib/api";
import ArticleCard from "@/components/ArticleCard";
import { Search, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function SearchClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  const handleSearch = async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    try {
      const data = await getArticles(1, 20, undefined, q);
      setArticles(data.articles);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.5rem", minHeight: "70vh" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.25rem", fontWeight: 400, color: "var(--text-header)", marginBottom: "2rem" }}>
        Search Articles
      </h1>

      <div style={{ marginBottom: "3rem" }}>
        <form onSubmit={(e) => { e.preventDefault(); handleSearch(query); }} style={{ position: "relative", maxWidth: "600px" }}>
          <Search size={20} style={{ position: "absolute", left: "1.125rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-soft)" }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type tool name, category, or keyword..."
            className="input-focus"
            style={{ width: "100%", padding: "1rem 1.25rem 1rem 3rem", border: "1.5px solid var(--border)", borderRadius: "14px", fontSize: "1rem", outline: "none", background: "var(--bg-card)", color: "var(--text)", transition: "all 0.2s" }}
          />
          {loading && (
            <Loader2 size={18} className="animate-spin" style={{ position: "absolute", right: "1.125rem", top: "50%", transform: "translateY(-50%)", color: "var(--accent)" }} />
          )}
        </form>
      </div>

      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", overflow: "hidden", height: "240px" }} className="skeleton" />
          ))}
        </div>
      ) : articles.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {articles.map((a, i) => (
            <div key={a.id} style={{ animation: "fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards", animationDelay: `${i * 0.06}s`, opacity: 0 }}>
              <ArticleCard article={a} />
            </div>
          ))}
        </div>
      ) : query && !loading ? (
        <div style={{ textAlign: "center", padding: "4rem 2rem", color: "var(--text-muted)" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔍</div>
          <h2 style={{ fontSize: "1.35rem", fontWeight: 600, color: "var(--text-header)", marginBottom: "0.5rem" }}>No results found for &quot;{query}&quot;</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "2rem" }}>
            Try adjusting your search terms or browse categories instead.
          </p>
          <div style={{ display: "flex", gap: "0.625rem", justifyContent: "center", flexWrap: "wrap" }}>
            {["Chatbots", "Coding", "Writing", "Images"].map(cat => (
              <button key={cat} onClick={() => { setQuery(cat); handleSearch(cat); }} style={{ padding: "0.5rem 1rem", borderRadius: "100px", border: "1px solid var(--border)", background: "var(--bg-card)", color: "var(--text)", fontSize: "0.82rem", fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text)"; }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "4rem 2rem", color: "var(--text-soft)" }}>
          <p style={{ fontSize: "1rem" }}>Enter a search term to find AI tool reviews.</p>
        </div>
      )}
    </div>
  );
}
