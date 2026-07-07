"use client";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { adminCreateArticle } from "@/lib/api";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import ArticleEditor from "@/components/ArticleEditor";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Article } from "@/lib/api";

export const dynamic = "force-dynamic";

export default function NewArticlePage() {
  const { token, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !token) router.push("/admin/login");
  }, [token, isLoading, router]);

  const handleSave = async (data: Partial<Article>) => {
    if (!token) throw new Error("Not authenticated");
    await adminCreateArticle(token, data);
  };

  if (isLoading || !token) return null;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: "2rem", overflowY: "auto" as const }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
          <Link href="/admin/dashboard"
            className="animated-underline"
            style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--text-soft)", textDecoration: "none", fontSize: "0.85rem" }}
          >
            <ArrowLeft size={14} /> Back
          </Link>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", fontWeight: 400, color: "var(--text-header)" }}>New Article</h1>
          </div>
        </div>
        <ArticleEditor mode="create" onSave={handleSave} />
      </main>
    </div>
  );
}
