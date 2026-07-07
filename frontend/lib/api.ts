const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface Article {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  author: string;
  image_url?: string;
  meta_description: string;
  reading_time: number;
  tags?: string;
  is_published: boolean;
  published_at: string;
  updated_at: string;
}

export interface ArticlesResponse {
  articles: Article[];
  total: number;
  page: number;
  pages: number;
}

export interface Category {
  category: string;
  count: number;
}

export interface Stats {
  total: number;
  published: number;
  drafts: number;
  categories: number;
}

// ─── Public API ──────────────────────────────────────────────────────────────

export async function getArticles(
  page = 1,
  limit = 12,
  category?: string,
  search?: string
): Promise<ArticlesResponse> {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (category) params.set("category", category);
  if (search) params.set("search", search);
  const res = await fetch(`${API_URL}/api/articles?${params}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch articles");
  return res.json();
}

export async function getArticle(slug: string): Promise<Article> {
  const res = await fetch(`${API_URL}/api/articles/${slug}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Article not found");
  return res.json();
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_URL}/api/categories`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

// ─── Admin API ────────────────────────────────────────────────────────────────

export async function adminLogin(username: string, password: string) {
  const res = await fetch(`${API_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Invalid credentials");
  return res.json();
}

export async function adminGetArticles(token: string): Promise<Article[]> {
  const res = await fetch(`${API_URL}/api/admin/articles`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}

export async function adminCreateArticle(token: string, data: Partial<Article>) {
  const res = await fetch(`${API_URL}/api/admin/articles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Failed to create article");
  }
  return res.json();
}

export async function adminUpdateArticle(token: string, id: number, data: Partial<Article>) {
  const res = await fetch(`${API_URL}/api/admin/articles/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update article");
  return res.json();
}

export async function adminDeleteArticle(token: string, id: number) {
  const res = await fetch(`${API_URL}/api/admin/articles/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to delete article");
  return res.json();
}

export async function adminGetStats(token: string): Promise<Stats> {
  const res = await fetch(`${API_URL}/api/admin/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
