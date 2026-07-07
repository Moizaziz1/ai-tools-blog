"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";
import { Settings, Key, Shield, Loader2, CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react";

export const dynamic = "force-dynamic";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function AdminSettingsPage() {
  const { token, isLoading, logout } = useAuth();
  const router = useRouter();

  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (!isLoading && !token) router.push("/admin/login");
  }, [token, isLoading, router]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (newPass !== confirmPass) { setMessage({ type: "error", text: "New passwords do not match." }); return; }
    if (newPass.length < 8) { setMessage({ type: "error", text: "Password must be at least 8 characters." }); return; }

    setSaving(true);
    try {
      const res = await fetch(`${API_URL}/api/admin/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ current_password: currentPass, new_password: newPass }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Failed to change password");
      }
      setMessage({ type: "success", text: "Password changed successfully. Please log in again." });
      setCurrentPass(""); setNewPass(""); setConfirmPass("");
      setTimeout(() => { logout(); router.push("/admin/login"); }, 2000);
    } catch (e: unknown) {
      setMessage({ type: "error", text: e instanceof Error ? e.message : "Failed to change password." });
    } finally {
      setSaving(false);
    }
  };

  if (isLoading || !token) return null;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />
      <main style={{ flex: 1, padding: "2rem", overflowY: "auto" as const, background: "#f8f7fc" }}>
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", fontWeight: 400, color: "#0a0a12", marginBottom: "0.25rem" }}>
            Settings
          </h1>
          <p style={{ color: "#64607a", fontSize: "0.875rem" }}>Manage your admin account settings.</p>
        </div>

        <div style={{ maxWidth: "640px", display: "flex", flexDirection: "column" as const, gap: "1.5rem" }}>
          {/* Account Info */}
          <div style={{ background: "#fff", border: "1px solid #e8e4f0", borderRadius: "16px", padding: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
              <div style={{ background: "rgba(108, 60, 233, 0.08)", borderRadius: "10px", padding: "0.5rem", display: "flex" }}>
                <Shield size={18} color="#6c3ce9" />
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 400, color: "#0a0a12" }}>
                Account Information
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {[
                ["Role", "Administrator"],
                ["Access Level", "Full Access"],
                ["Authentication", "JWT Token"],
                ["Session", "24 Hours"],
              ].map(([k, v]) => (
                <div key={k} style={{ background: "#faf9ff", borderRadius: "10px", padding: "0.875rem 1rem" }}>
                  <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "#9892ad", textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: "0.25rem" }}>{k}</p>
                  <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "#0a0a12" }}>{v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Change Password */}
          <div style={{ background: "#fff", border: "1px solid #e8e4f0", borderRadius: "16px", padding: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ background: "rgba(16, 185, 129, 0.08)", borderRadius: "10px", padding: "0.5rem", display: "flex" }}>
                <Key size={18} color="#10b981" />
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 400, color: "#0a0a12" }}>
                Change Password
              </h2>
            </div>

            {message && (
              <div style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                background: message.type === "success" ? "#d1fae5" : "#ffe4e6",
                border: `1px solid ${message.type === "success" ? "#6ee7b7" : "#fda4af"}`,
                borderRadius: "10px", padding: "0.875rem 1.125rem", marginBottom: "1.25rem",
                color: message.type === "success" ? "#065f46" : "#f43f5e",
                fontSize: "0.875rem",
              }}>
                {message.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                {message.text}
              </div>
            )}

            <form onSubmit={handlePasswordChange} style={{ display: "flex", flexDirection: "column" as const, gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#64607a", marginBottom: "0.5rem", textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>
                  Current Password
                </label>
                <div style={{ position: "relative" }}>
                  <input type={showCurrent ? "text" : "password"} value={currentPass} onChange={e => setCurrentPass(e.target.value)} required
                    className="input-focus"
                    style={{ width: "100%", padding: "0.8rem 2.75rem 0.8rem 1rem", border: "1.5px solid #e8e4f0", borderRadius: "10px", fontSize: "0.925rem", outline: "none", color: "#1a1625", background: "#fff" }} />
                  <button type="button" onClick={() => setShowCurrent(!showCurrent)}
                    style={{ position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9892ad" }}>
                    {showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#64607a", marginBottom: "0.5rem", textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>
                  New Password
                </label>
                <div style={{ position: "relative" }}>
                  <input type={showNew ? "text" : "password"} value={newPass} onChange={e => setNewPass(e.target.value)} required minLength={8}
                    className="input-focus"
                    style={{ width: "100%", padding: "0.8rem 2.75rem 0.8rem 1rem", border: "1.5px solid #e8e4f0", borderRadius: "10px", fontSize: "0.925rem", outline: "none", color: "#1a1625", background: "#fff" }} />
                  <button type="button" onClick={() => setShowNew(!showNew)}
                    style={{ position: "absolute", right: "0.875rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9892ad" }}>
                    {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {newPass && (
                  <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.3rem" }}>
                    {[8, 12, 16].map((threshold, i) => (
                      <div key={i} style={{ height: "3px", flex: 1, borderRadius: "2px", background: newPass.length >= threshold ? ["#6c3ce9","#a78bfa","#10b981"][i] : "#e8e4f0", transition: "background 0.2s" }} />
                    ))}
                    <span style={{ fontSize: "0.72rem", color: "#9892ad", whiteSpace: "nowrap" as const }}>
                      {newPass.length < 8 ? "Too short" : newPass.length < 12 ? "Weak" : newPass.length < 16 ? "Good" : "Strong"}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "#64607a", marginBottom: "0.5rem", textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>
                  Confirm New Password
                </label>
                <input type="password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} required
                  className="input-focus"
                  style={{ width: "100%", padding: "0.8rem 1rem", border: `1.5px solid ${confirmPass && confirmPass !== newPass ? "#fda4af" : "#e8e4f0"}`, borderRadius: "10px", fontSize: "0.925rem", outline: "none", color: "#1a1625", background: "#fff" }} />
                {confirmPass && confirmPass !== newPass && (
                  <p style={{ fontSize: "0.75rem", color: "#f43f5e", marginTop: "0.3rem" }}>Passwords do not match</p>
                )}
              </div>

              <button type="submit" disabled={saving}
                style={{ background: saving ? "var(--accent-soft)" : "linear-gradient(135deg, #6c3ce9, #a78bfa)", color: "#fff", border: "none", padding: "0.85rem 1.5rem", borderRadius: "10px", fontSize: "0.9rem", fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: "0.5rem", alignSelf: "flex-start" as const, marginTop: "0.5rem", boxShadow: "0 4px 12px rgba(108, 60, 233, 0.25)" }}>
                {saving ? <><Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} /> Saving…</> : <><Key size={15} /> Change Password</>}
              </button>
            </form>
          </div>

          {/* Danger Zone */}
          <div style={{ background: "#fff", border: "1px solid #fda4af", borderRadius: "16px", padding: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{ background: "#ffe4e6", borderRadius: "10px", padding: "0.5rem", display: "flex" }}>
                <Settings size={18} color="#f43f5e" />
              </div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 400, color: "#f43f5e" }}>Danger Zone</h2>
            </div>
            <p style={{ fontSize: "0.875rem", color: "#64607a", marginBottom: "1rem", lineHeight: 1.6 }}>
              Signing out will invalidate your current session. You&apos;ll need to log in again.
            </p>
            <button
              onClick={() => { logout(); router.push("/admin/login"); }}
              style={{ background: "#ffe4e6", color: "#f43f5e", border: "1px solid #fda4af", padding: "0.65rem 1.25rem", borderRadius: "10px", fontSize: "0.875rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>
              Sign Out of Admin Panel
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
