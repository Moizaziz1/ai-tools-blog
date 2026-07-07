"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, Cpu, Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";

export default function Header() {
  const { theme, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const themeIcon = mounted ? (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />) : <Moon size={18} />;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/category/AI%20Chatbots", label: "Chatbots" },
    { href: "/category/AI%20Coding%20Tools", label: "Coding" },
    { href: "/category/AI%20Writing%20Tools", label: "Writing" },
    { href: "/category/AI%20Image%20Generation", label: "Images" },
    { href: "/category/AI%20Video%20Tools", label: "Video" },
    { href: "/category/AI%20Audio%20Tools", label: "Audio" },
    { href: "/category/AI%20Productivity%20Tools", label: "Productivity" },
    { href: "/category/AI%20Search%20%26%20Research", label: "Search" },
  ];

  return (
    <header
      className={scrolled ? "glass" : ""}
      style={{
        backgroundColor: scrolled ? undefined : "var(--bg-card)",
        color: "var(--text)",
        borderBottom: "1px solid var(--border)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "68px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.625rem",
            textDecoration: "none",
            color: "var(--text-header)",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, var(--accent), var(--accent-soft))",
              borderRadius: "10px",
              width: "34px",
              height: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px var(--accent-glow)",
            }}
          >
            <Cpu size={18} color="white" />
          </div>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.35rem",
              letterSpacing: "-0.02em",
            }}
          >
            AIToolsHub
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden-on-mobile"
          style={{ gap: "0.125rem", alignItems: "center", overflowX: "auto", flexWrap: "nowrap" as const }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="animated-underline"
              style={{
                color: "var(--text-muted)",
                textDecoration: "none",
                padding: "0.5rem 0.75rem",
                borderRadius: "10px",
                fontSize: "0.82rem",
                fontWeight: 500,
                whiteSpace: "nowrap" as const,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--bg-hover)";
                e.currentTarget.style.color = "var(--text-header)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--text-muted)";
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
          {/* Search Toggle (Desktop) */}
          <div style={{ position: "relative" }} className="hidden-on-mobile">
            {searchOpen ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                  }
                }}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="input-focus"
                  style={{
                    background: "var(--bg-hover)",
                    border: "1.5px solid var(--border)",
                    borderRadius: "10px",
                    padding: "0.5rem 1rem",
                    color: "var(--text)",
                    fontSize: "0.875rem",
                    width: "200px",
                    outline: "none",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-soft)", padding: "0.25rem" }}
                >
                  <X size={18} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                style={{
                  background: "var(--bg-hover)",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--text-soft)",
                  padding: "0.5rem",
                  alignItems: "center",
                  borderRadius: "10px",
                  transition: "all 0.2s",
                  display: "flex",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--accent-pale)";
                  e.currentTarget.style.color = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--bg-hover)";
                  e.currentTarget.style.color = "var(--text-soft)";
                }}
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggle}
            style={{
              background: "var(--bg-hover)",
              border: "none",
              cursor: "pointer",
              color: "var(--text-soft)",
              padding: "0.5rem",
              alignItems: "center",
              borderRadius: "10px",
              transition: "all 0.25s ease",
              display: "flex",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--accent-pale)";
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--bg-hover)";
              e.currentTarget.style.color = "var(--text-soft)";
            }}
            aria-label="Toggle theme"
          >
            {themeIcon}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="visible-on-mobile"
            style={{
              background: "var(--bg-hover)",
              border: "none",
              cursor: "pointer",
              color: "var(--text-header)",
              padding: "0.5rem",
              alignItems: "center",
              borderRadius: "10px",
            }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="visible-on-mobile"
          style={{
            position: "fixed",
            top: "68px",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "var(--bg)",
            zIndex: 90,
            padding: "1.5rem",
            flexDirection: "column",
            gap: "0.5rem",
            animation: "fadeIn 0.2s ease-out",
            overflowY: "auto",
          }}
        >
          {/* Mobile Search */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) {
                window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
              }
            }}
            style={{ marginBottom: "1.5rem" }}
          >
            <div style={{ position: "relative" }}>
              <Search size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-soft)" }} />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reviews..."
                className="input-focus"
                style={{
                  width: "100%",
                  background: "var(--bg-card)",
                  border: "1.5px solid var(--border)",
                  borderRadius: "14px",
                  padding: "0.875rem 1rem 0.875rem 2.75rem",
                  color: "var(--text)",
                  fontSize: "1rem",
                  outline: "none",
                }}
              />
            </div>
          </form>

          <p style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-soft)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem", paddingLeft: "0.5rem" }}>Navigation</p>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                color: "var(--text)",
                textDecoration: "none",
                padding: "1rem 1.25rem",
                borderRadius: "14px",
                fontSize: "1.05rem",
                fontWeight: 500,
                background: "var(--bg-card)",
                border: "1px solid var(--border-soft)",
                transition: "all 0.2s",
              }}
            >
              {link.label}
            </Link>
          ))}

          <div style={{ marginTop: "auto", paddingBottom: "2rem", textAlign: "center" }}>
            <p style={{ color: "var(--text-soft)", fontSize: "0.8rem" }}>&copy; {new Date().getFullYear()} AIToolsHub. All rights reserved.</p>
          </div>
        </div>
      )}
    </header>
  );
}
