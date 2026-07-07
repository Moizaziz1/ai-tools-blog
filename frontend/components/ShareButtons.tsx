"use client";
import { useState } from "react";
import { Twitter, Linkedin, Link2, Check } from "lucide-react";

interface Props {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: Props) {
  const [copied, setCopied] = useState(false);

  const fullUrl = `https://aitoolshub.com${url}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const el = document.createElement("input");
      el.value = fullUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareLinks = [
    {
      label: "Twitter / X",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&via=aitoolshub`,
      color: "#1d9bf0",
      bg: "#1d9bf012",
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "#0a66c2",
      bg: "#0a66c212",
    },
  ];

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "14px",
        padding: "1.25rem",
        marginBottom: "1.25rem",
      }}
    >
      <p
        style={{
          fontSize: "0.72rem",
          fontWeight: 700,
          color: "var(--text-soft)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginBottom: "0.875rem",
        }}
      >
        Share this article
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {shareLinks.map(({ label, icon: Icon, href, color, bg }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.6rem 0.875rem",
              borderRadius: "10px",
              background: bg,
              color,
              textDecoration: "none",
              fontSize: "0.85rem",
              fontWeight: 600,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateX(4px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateX(0)"; }}
          >
            <Icon size={15} />
            {label}
          </a>
        ))}
        <button
          onClick={copyLink}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.6rem 0.875rem",
            borderRadius: "10px",
            background: copied ? "var(--accent-pale)" : "var(--bg-hover)",
            color: copied ? "var(--accent)" : "var(--text-muted)",
            border: "none",
            cursor: "pointer",
            fontSize: "0.85rem",
            fontWeight: 600,
            transition: "all 0.2s",
            textAlign: "left",
            width: "100%",
          }}
        >
          {copied ? <Check size={15} /> : <Link2 size={15} />}
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>
    </div>
  );
}
