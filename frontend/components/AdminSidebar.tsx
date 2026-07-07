"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { LayoutDashboard, FileText, PlusCircle, LogOut, Cpu, ExternalLink, Settings } from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/articles", icon: FileText, label: "All Articles" },
  { href: "/admin/articles/new", icon: PlusCircle, label: "New Article" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => { logout(); router.push("/admin/login"); };

  return (
    <aside style={{ width: "240px", background: "linear-gradient(180deg, #0a0a12 0%, #12121f 100%)", color: "#faf9ff", minHeight: "100vh", display: "flex", flexDirection: "column", flexShrink: 0, borderRight: "1px solid #2a2840" }}>
      {/* Brand */}
      <div style={{ padding: "1.5rem", borderBottom: "1px solid #2a2840" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ background: "linear-gradient(135deg, #6c3ce9, #a78bfa)", borderRadius: "10px", width: "34px", height: "34px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(108, 60, 233, 0.3)" }}>
            <Cpu size={16} color="white" />
          </div>
          <div>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1rem", lineHeight: 1.2 }}>AIToolsHub</p>
            <p style={{ fontSize: "0.7rem", color: "#5a5470" }}>Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: "1rem 0.75rem", flex: 1 }}>
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || (href !== "/admin/dashboard" && pathname.startsWith(href) && href !== "/admin/articles" && pathname !== "/admin/articles");
          const isArticlesList = href === "/admin/articles" && pathname === "/admin/articles";
          const isActive = active || isArticlesList;
          return (
            <Link key={href} href={href}
              style={{
                display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.7rem 1rem", borderRadius: "10px", textDecoration: "none",
                color: isActive ? "#fff" : "#9892ad",
                background: isActive ? "rgba(108, 60, 233, 0.15)" : "transparent",
                marginBottom: "0.25rem", fontSize: "0.875rem", fontWeight: isActive ? 600 : 400,
                transition: "all 0.2s",
                borderLeft: isActive ? "3px solid #a78bfa" : "3px solid transparent",
              }}>
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: "1rem", borderTop: "1px solid #2a2840" }}>
        <Link href="/" target="_blank"
          style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.625rem 1rem", borderRadius: "10px", textDecoration: "none", color: "#5a5470", fontSize: "0.82rem", marginBottom: "0.25rem", transition: "color 0.2s" }}
          className="hover:!text-[#9892ad]"
        >
          <ExternalLink size={14} /> View Site
        </Link>
        <button onClick={handleLogout}
          style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.625rem 1rem", borderRadius: "10px", background: "none", border: "none", color: "#5a5470", cursor: "pointer", width: "100%", fontSize: "0.82rem", transition: "color 0.2s" }}
          className="hover:!text-[#f43f5e]"
        >
          <LogOut size={14} /> Sign Out
        </button>
      </div>
    </aside>
  );
}
