"use client";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { adminLogin } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Cpu, Eye, EyeOff, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await adminLogin(username, password);
      login(data.access_token);
      router.push("/admin/dashboard");
    } catch {
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #0a0a12 0%, #12121f 50%, #1a1040 100%)", padding: "1.5rem", position: "relative", overflow: "hidden" }}>
      {/* Background Decor */}
      <div style={{
        position: "absolute",
        top: "-150px",
        right: "-150px",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(108, 60, 233, 0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: "-100px",
        left: "-100px",
        width: "300px",
        height: "300px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ width: "100%", maxWidth: "420px", position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "56px", height: "56px", background: "linear-gradient(135deg, #6c3ce9, #a78bfa)", borderRadius: "16px", marginBottom: "1.25rem", boxShadow: "0 8px 32px rgba(108, 60, 233, 0.3)" }}>
            <Cpu size={26} color="white" />
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "#ffffff", fontWeight: 400, marginBottom: "0.3rem" }}>AIToolsHub Admin</h1>
          <p style={{ color: "#9892ad", fontSize: "0.875rem" }}>Sign in to manage your articles</p>
        </div>

        {/* Form */}
        <div style={{ background: "var(--bg-card)", borderRadius: "20px", padding: "2rem", boxShadow: "0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px var(--border)" }}>
          {error && (
            <div style={{ background: "rgba(244, 63, 94, 0.08)", border: "1px solid rgba(244, 63, 94, 0.2)", borderRadius: "12px", padding: "0.875rem 1.125rem", marginBottom: "1.25rem", color: "#f43f5e", fontSize: "0.875rem", fontWeight: 500 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1.25rem" }}>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text)", marginBottom: "0.5rem" }}>Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoFocus
                placeholder="admin"
                className="input-focus"
                style={{ width: "100%", padding: "0.8rem 1rem", border: "1.5px solid var(--border)", borderRadius: "10px", fontSize: "0.95rem", outline: "none", color: "var(--text)", background: "var(--bg)" }}
              />
            </div>

            <div style={{ marginBottom: "1.75rem" }}>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text)", marginBottom: "0.5rem" }}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="input-focus"
                  style={{ width: "100%", padding: "0.8rem 2.75rem 0.8rem 1rem", border: "1.5px solid var(--border)", borderRadius: "10px", fontSize: "0.95rem", outline: "none", color: "var(--text)", background: "var(--bg)" }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  style={{ position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-soft)" }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              style={{ width: "100%", background: loading ? "var(--accent-soft)" : "linear-gradient(135deg, #6c3ce9, #a78bfa)", color: "#fff", border: "none", padding: "0.9rem", borderRadius: "12px", fontSize: "0.95rem", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", transition: "all 0.2s", boxShadow: "0 4px 16px rgba(108, 60, 233, 0.3)" }}>
              {loading ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Signing in…</> : "Sign In →"}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", color: "#5a5470", fontSize: "0.78rem", marginTop: "1.5rem" }}>
          Default: admin / admin123 — Change in production!
        </p>
      </div>
    </div>
  );
}
