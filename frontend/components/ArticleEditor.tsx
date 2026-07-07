"use client";
import { useState } from "react";
import { slugify } from "@/lib/api";
import { Save, Loader2, Eye, EyeOff } from "lucide-react";
import type { Article } from "@/lib/api";

const CATEGORIES = [
  "AI Chatbots", "AI Coding Tools", "AI Writing Tools", "AI Image Generation",
  "AI Video Tools", "AI Audio Tools", "AI Productivity Tools", "AI Search & Research",
];

interface Props {
  initial?: Partial<Article>;
  onSave: (data: Partial<Article>) => Promise<void>;
  mode: "create" | "edit";
}

export default function ArticleEditor({ initial, onSave, mode }: Props) {
  const [title, setTitle] = useState(initial?.title || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [category, setCategory] = useState(initial?.category || CATEGORIES[0]);
  const [excerpt, setExcerpt] = useState(initial?.excerpt || "");
  const [content, setContent] = useState(initial?.content || "");
  const [metaDesc, setMetaDesc] = useState(initial?.meta_description || "");
  const [readingTime, setReadingTime] = useState(initial?.reading_time || 5);
  const [imageUrl, setImageUrl] = useState(initial?.image_url || "");
  const [tags, setTags] = useState((initial as any)?.tags || "");
  const [isPublished, setIsPublished] = useState(initial?.is_published ?? true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [preview, setPreview] = useState(false);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (mode === "create") setSlug(slugify(val));
  };

  const handleSave = async () => {
    if (!title || !slug || !content || !excerpt) { setError("Title, slug, excerpt, and content are required."); return; }
    setSaving(true); setError(""); setSuccess("");
    try {
      await onSave({ title, slug, category, excerpt, content, meta_description: metaDesc, reading_time: readingTime, is_published: isPublished, tags, image_url: imageUrl } as any);
      setSuccess(mode === "create" ? "Article created!" : "Article updated!");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to save article.");
    } finally { setSaving(false); }
  };

  const renderPreview = () => {
    const html = content.replace(/## (.+)/g, '<h2 style="font-family:var(--font-display);font-size:1.6rem;font-weight:400;margin:2rem 0 0.75rem;color:var(--text-header);padding-bottom:0.5rem">$1</h2>')
      .replace(/### (.+)/g, '<h3 style="font-size:1.15rem;font-weight:600;margin:1.5rem 0 0.5rem;color:var(--text-header)">$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p style="margin-bottom:1.3rem;line-height:1.9">')
      .replace(/^/, '<p style="margin-bottom:1.3rem;line-height:1.9">') + '</p>';
    return html;
  };

  const inputStyle = {
    width: "100%", padding: "0.8rem 1rem", border: "1.5px solid var(--border)", borderRadius: "10px",
    fontSize: "0.925rem", outline: "none", transition: "border-color 0.2s, box-shadow 0.2s", color: "var(--text)", background: "var(--bg-card)",
  };

  const labelStyle = { display: "block" as const, fontSize: "0.78rem", fontWeight: 700 as const, color: "var(--text-soft)", marginBottom: "0.5rem", textTransform: "uppercase" as const, letterSpacing: "0.06em" };

  return (
    <div>
      {error && <div style={{ background: "#ffe4e6", border: "1px solid #fda4af", borderRadius: "10px", padding: "0.875rem 1.125rem", marginBottom: "1.25rem", color: "#f43f5e", fontSize: "0.875rem" }}>{error}</div>}
      {success && <div style={{ background: "#d1fae5", border: "1px solid #6ee7b7", borderRadius: "10px", padding: "0.875rem 1.125rem", marginBottom: "1.25rem", color: "#065f46", fontSize: "0.875rem" }}>{success} <a href={`/articles/${slug}`} target="_blank" style={{ color: "#10b981", fontWeight: 700 }}>View article →</a></div>}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "1.5rem", alignItems: "start" }}>
        {/* Main */}
        <div style={{ display: "flex", flexDirection: "column" as const, gap: "1.25rem" }}>
          {/* Title */}
          <div>
            <label style={labelStyle}>Title *</label>
            <input value={title} onChange={e => handleTitleChange(e.target.value)} placeholder="e.g. ChatGPT Review 2024: Honest Take After Daily Use"
              className="input-focus" style={inputStyle} />
          </div>

          {/* Slug */}
          <div>
            <label style={labelStyle}>URL Slug *</label>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--text-soft)", whiteSpace: "nowrap" as const }}>/articles/</span>
              <input value={slug} onChange={e => setSlug(e.target.value)} placeholder="chatgpt-review-2024"
                className="input-focus"
                style={{ ...inputStyle, flex: 1, fontFamily: "var(--font-mono)", fontSize: "0.85rem" }} />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label style={labelStyle}>Excerpt * <span style={{ fontWeight: 400, color: "var(--text-soft)", textTransform: "none" as const, letterSpacing: 0 }}>— shown on card & search results</span></label>
            <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={3} placeholder="Write a compelling 1-2 sentence summary..."
              className="input-focus"
              style={{ ...inputStyle, resize: "vertical" as const, lineHeight: 1.7 }} />
          </div>

          {/* Content Editor */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
              <label style={{ ...labelStyle, marginBottom: 0 }}>Content * <span style={{ fontWeight: 400, color: "var(--text-soft)", textTransform: "none" as const, letterSpacing: 0 }}>— Markdown supported</span></label>
              <button type="button" onClick={() => setPreview(!preview)}
                style={{ display: "flex", alignItems: "center", gap: "0.35rem", background: preview ? "var(--accent-pale)" : "var(--bg-hover)", border: "none", borderRadius: "8px", padding: "0.4rem 0.875rem", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600, color: preview ? "var(--accent)" : "var(--text-muted)", transition: "all 0.2s" }}>
                {preview ? <><EyeOff size={13} /> Edit</> : <><Eye size={13} /> Preview</>}
              </button>
            </div>
            {preview ? (
              <div style={{ border: "1.5px solid var(--border)", borderRadius: "10px", padding: "1.5rem", minHeight: "400px", background: "var(--bg-card)" }}
                dangerouslySetInnerHTML={{ __html: renderPreview() }} />
            ) : (
              <textarea value={content} onChange={e => setContent(e.target.value)} rows={20} placeholder={`## Introduction\n\nWrite your article here using Markdown...\n\n## Section 1\n\nYour content...`}
                className="input-focus"
                style={{ ...inputStyle, resize: "vertical" as const, fontFamily: "var(--font-mono)", fontSize: "0.875rem", lineHeight: 1.75 }} />
            )}
            <p style={{ fontSize: "0.75rem", color: "var(--text-soft)", marginTop: "0.4rem" }}>
              Use ## for headings, ### for subheadings, **bold**, *italic*, - for bullet lists
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column" as const, gap: "1rem" }}>
          {/* Publish */}
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "14px", padding: "1.375rem" }}>
            <button onClick={handleSave} disabled={saving}
              style={{ width: "100%", background: saving ? "var(--accent-soft)" : "linear-gradient(135deg, #6c3ce9, #a78bfa)", color: "#fff", border: "none", padding: "0.9rem", borderRadius: "10px", fontSize: "0.9rem", fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "1rem", boxShadow: "0 4px 12px rgba(108, 60, 233, 0.25)" }}>
              {saving ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Saving…</> : <><Save size={16} /> {mode === "create" ? "Publish Article" : "Save Changes"}</>}
            </button>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.5rem 0" }}>
              <span style={{ fontSize: "0.875rem", color: "var(--text)", fontWeight: 500 }}>Published</span>
              <div onClick={() => setIsPublished(!isPublished)}
                style={{ width: "44px", height: "24px", borderRadius: "100px", background: isPublished ? "#10b981" : "#d1cfc9", cursor: "pointer", position: "relative", transition: "background 0.2s" }}>
                <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "#fff", position: "absolute", top: "3px", left: isPublished ? "23px" : "3px", transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
              </div>
            </div>
          </div>

          {/* Category */}
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "14px", padding: "1.375rem" }}>
            <label style={labelStyle}>Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)}
              className="input-focus"
              style={{ ...inputStyle, cursor: "pointer" }}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Meta */}
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "14px", padding: "1.375rem" }}>
            <label style={{ ...labelStyle, marginBottom: "1rem" }}>SEO Settings</label>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ ...labelStyle, fontSize: "0.72rem" }}>Meta Description</label>
              <textarea value={metaDesc} onChange={e => setMetaDesc(e.target.value)} rows={3} placeholder="Brief description for Google (150-160 chars)"
                className="input-focus"
                style={{ ...inputStyle, resize: "vertical" as const, fontSize: "0.85rem" }} />
              <p style={{ fontSize: "0.72rem", color: metaDesc.length > 160 ? "#f43f5e" : "var(--text-soft)", marginTop: "0.25rem" }}>{metaDesc.length}/160</p>
            </div>
            <div>
              <label style={{ ...labelStyle, fontSize: "0.72rem" }}>Reading Time (minutes)</label>
              <input type="number" value={readingTime} onChange={e => setReadingTime(Number(e.target.value))} min={1} max={30}
                className="input-focus"
                style={{ ...inputStyle, width: "80px" }} />
            </div>
            <div style={{ marginTop: "1rem" }}>
              <label style={{ ...labelStyle, fontSize: "0.72rem" }}>Tags (comma-separated)</label>
              <input value={tags} onChange={e => setTags(e.target.value)} placeholder="chatgpt, ai chatbot, openai"
                className="input-focus" style={{ ...inputStyle, fontSize: "0.85rem" }} />
              <p style={{ fontSize: "0.72rem", color: "var(--text-soft)", marginTop: "0.25rem" }}>Separate with commas</p>
            </div>
            <div style={{ marginTop: "1rem" }}>
              <label style={{ ...labelStyle, fontSize: "0.72rem" }}>Cover Image URL <span style={{ fontWeight: 400, color: "var(--text-soft)", textTransform: "none" as const, letterSpacing: 0 }}>(optional)</span></label>
              <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://example.com/image.jpg"
                className="input-focus" style={{ ...inputStyle, fontSize: "0.85rem" }} />
              {imageUrl && (
                <div style={{ marginTop: "0.5rem", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--border)", height: "80px", background: "var(--bg-hover)" }}>
                  <img src={imageUrl} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                </div>
              )}
            </div>
          </div>

          {/* Tips */}
          <div style={{ background: "var(--bg-hover)", border: "1px solid var(--border)", borderRadius: "14px", padding: "1.375rem" }}>
            <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-soft)", textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: "0.75rem" }}>Writing Tips</p>
            {["Start with the honest verdict", "Include your actual experience", "Mention pricing clearly", "Compare to alternatives", "Use ## for section headings"].map(tip => (
              <p key={tip} style={{ fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.5, padding: "0.35rem 0", borderBottom: "1px solid var(--border-soft)" }}>• {tip}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
