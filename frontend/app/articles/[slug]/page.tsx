import { getArticle, getArticles } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Clock, Calendar, ArrowLeft, Tag, ArrowUpRight, BookOpen } from "lucide-react";
import ReadingProgress from "@/components/ReadingProgress";
import StructuredData, { BreadcrumbLD } from "@/components/StructuredData";
import ShareButtons from "@/components/ShareButtons";
import TableOfContents from "@/components/TableOfContents";
import BackToTop from "@/components/BackToTop";
import AdBanner from "@/components/AdBanner";

export const dynamic = "force-dynamic";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const article = await getArticle(slug);
    return {
      title: article.title,
      description: article.meta_description,
      openGraph: {
        title: article.title,
        description: article.meta_description,
        type: "article",
        publishedTime: article.published_at,
        modifiedTime: article.updated_at,
        authors: [article.author],
        section: article.category,
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: article.meta_description,
      },
      alternates: { canonical: `https://aitoolshub.com/articles/${article.slug}` },
    };
  } catch { return { title: "Article Not Found" }; }
}

const CAT_COLORS: Record<string, string> = {
  "AI Chatbots": "#6c3ce9", "AI Coding Tools": "#10b981", "AI Writing Tools": "#f59e0b",
  "AI Image Generation": "#ec4899", "AI Video Tools": "#3b82f6", "AI Audio Tools": "#f43f5e",
  "AI Productivity Tools": "#14b8a6", "AI Search & Research": "#8b5cf6",
};

function slugId(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function renderMarkdown(content: string) {
  const lines = content.split("\n");
  const html: string[] = [];
  let inList = false;

  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (inList) { html.push("</ul>"); inList = false; }
      const text = line.slice(3);
      const id = slugId(text);
      html.push(`<h2 id="${id}">${text}</h2>`);
    } else if (line.startsWith("### ")) {
      if (inList) { html.push("</ul>"); inList = false; }
      const text = line.slice(4);
      const id = slugId(text);
      html.push(`<h3 id="${id}">${text}</h3>`);
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      if (!inList) { html.push("<ul>"); inList = true; }
      let li = line.slice(2)
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/`(.+?)`/g, "<code>$1</code>");
      html.push(`<li>${li}</li>`);
    } else if (line.trim() === "") {
      if (inList) { html.push("</ul>"); inList = false; }
    } else {
      if (inList) { html.push("</ul>"); inList = false; }
      let p = line
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/`(.+?)`/g, "<code>$1</code>");
      html.push(`<p>${p}</p>`);
    }
  }
  if (inList) html.push("</ul>");
  return html.join("\n");
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  let article;
  try { article = await getArticle(slug); }
  catch { notFound(); }

  const { articles: related } = await getArticles(1, 4, article.category);
  const relatedFiltered = related.filter(a => a.slug !== article.slug).slice(0, 3);

  const color = CAT_COLORS[article.category] || "#6c3ce9";
  const date = new Date(article.published_at).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
  const htmlContent = renderMarkdown(article.content);
  const wordCount = article.content.split(/\s+/).length;

  return (
    <>
      <ReadingProgress />
      <BackToTop />
      <StructuredData type="article" article={article} />
      <BreadcrumbLD items={[
        { name: "Home", url: "/" },
        { name: "Articles", url: "/articles" },
        { name: article.category, url: `/category/${encodeURIComponent(article.category)}` },
        { name: article.title, url: `/articles/${article.slug}` },
      ]} />

      {/* Article Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${color}12 0%, var(--bg) 50%, ${color}06 100%)`,
        padding: "2.5rem 1.5rem 0",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Link href="/articles"
            className="back-link"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)", textDecoration: "none", fontSize: "0.85rem", marginBottom: "1.5rem", transition: "color 0.2s" }}
          >
            <ArrowLeft size={14} /> Back to articles
          </Link>

          {/* Category */}
          <div style={{ marginBottom: "1rem" }}>
            <Link href={`/category/${encodeURIComponent(article.category)}`}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: `${color}15`, color, padding: "0.35rem 0.875rem", borderRadius: "100px", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none", letterSpacing: "0.04em", textTransform: "uppercase" as const, transition: "all 0.2s" }}>
              <Tag size={11} /> {article.category}
            </Link>
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.85rem, 4vw, 2.75rem)",
            fontWeight: 400,
            lineHeight: 1.2,
            color: "var(--text-header)",
            marginBottom: "1.25rem",
            letterSpacing: "-0.02em",
            maxWidth: "800px",
          }}>
            {article.title}
          </h1>

          {/* Meta row */}
          <div style={{ display: "flex", gap: "1.25rem", alignItems: "center", color: "var(--text-soft)", fontSize: "0.82rem", marginBottom: "2rem", flexWrap: "wrap" as const }}>
            <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <Calendar size={13} /> {date}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <Clock size={13} /> {article.reading_time} min read
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontWeight: 600, color: "var(--text-muted)" }}>
              <BookOpen size={13} /> {article.author}
            </span>
            <span style={{ color: "var(--border)" }}>·</span>
            <span>{wordCount.toLocaleString()} words</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        <div className="layout-two-col" style={{ gap: "3.5rem" }}>
          {/* ── Article ───────────────────────────────────────── */}
          <article>
            {/* Excerpt */}
            <div style={{ background: `${color}08`, borderLeft: `3px solid ${color}`, padding: "1.125rem 1.5rem", borderRadius: "0 12px 12px 0", marginBottom: "2.5rem" }}>
              <p style={{ color: "var(--text)", lineHeight: 1.75, fontStyle: "italic", fontSize: "1.05rem", margin: 0 }}>
                {article.excerpt}
              </p>
            </div>

            {/* Top Ad */}
            <div style={{ marginBottom: "2.5rem" }}>
              <AdBanner slot="top-article" style={{ minHeight: "90px", borderRadius: "12px" }} />
            </div>

            <div style={{ height: "1px", background: "linear-gradient(90deg, var(--border), transparent)", marginBottom: "2.5rem" }} />

            {/* Content */}
            <div className="article-content" style={{ maxWidth: "72ch" }}
              dangerouslySetInnerHTML={{ __html: htmlContent }} />

            {/* Mid Ad */}
            <div style={{ margin: "2.5rem 0" }}>
              <AdBanner slot="mid-article" style={{ minHeight: "250px", borderRadius: "12px" }} />
            </div>

            {/* Footer row */}
            <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: "1rem" }}>
              <Link href={`/category/${encodeURIComponent(article.category)}`}
                className="cat-pill-hover"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: `${color}12`, color, padding: "0.5rem 1rem", borderRadius: "100px", fontSize: "0.82rem", fontWeight: 600, textDecoration: "none", transition: "all 0.2s" }}
              >
                More {article.category} <ArrowUpRight size={14} />
              </Link>
              <span style={{ fontSize: "0.8rem", color: "var(--text-soft)" }}>
                Updated: {new Date(article.updated_at).toLocaleDateString()}
              </span>
            </div>
          </article>

          {/* ── Sidebar ──────────────────────────────────────── */}
          <aside className="layout-sidebar-sticky">
            {/* Article info */}
            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "14px", padding: "1.375rem", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", flexShrink: 0 }}>🤖</div>
                <div>
                  <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-soft)", letterSpacing: "0.06em", textTransform: "uppercase" as const, marginBottom: "0.2rem" }}>Quick Info</p>
                  <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-header)" }}>{article.category}</p>
                </div>
              </div>
              {[
                ["Reading time", `${article.reading_time} min`],
                ["Word count", wordCount.toLocaleString()],
                ["Published", date],
                ["Author", article.author],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", padding: "0.5rem 0", borderTop: "1px solid var(--border-soft)" }}>
                  <span style={{ color: "var(--text-soft)" }}>{k}</span>
                  <span style={{ color: "var(--text-header)", fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>

            {/* Table of Contents */}
            <TableOfContents content={article.content} />

            {/* Share */}
            <ShareButtons url={`/articles/${article.slug}`} title={article.title} />

            {/* Sidebar Ad */}
            <div style={{ marginBottom: "1.25rem" }}>
              <AdBanner slot="sidebar" style={{ minHeight: "250px", borderRadius: "12px" }} />
            </div>

            {/* Related */}
            {relatedFiltered.length > 0 && (
              <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "14px", padding: "1.375rem" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 400, color: "var(--text-header)", marginBottom: "1rem" }}>Related Articles</h3>
                <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.75rem" }}>
                  {relatedFiltered.map(r => (
                    <Link key={r.id} href={`/articles/${r.slug}`}
                      className="related-link"
                      style={{ display: "block", textDecoration: "none", color: "inherit", padding: "0.875rem", borderRadius: "12px", background: "var(--bg-hover)", transition: "all 0.2s" }}
                    >
                      <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-header)", lineHeight: 1.4, marginBottom: "0.35rem" }}>{r.title}</p>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-soft)" }}>{r.reading_time} min · {r.category}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}
