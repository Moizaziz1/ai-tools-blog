"use client";
import { useEffect, useRef } from "react";

interface Props {
  slot: string;
  style?: React.CSSProperties;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
}

// Replace XXXXXXXXXXXXXXXX with your actual AdSense publisher ID
const ADSENSE_CLIENT = "ca-pub-XXXXXXXXXXXXXXXX";

export default function AdBanner({ slot, style, format = "auto", className }: Props) {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, []);

  // In development, show a placeholder
  if (process.env.NODE_ENV === "development") {
    return (
      <div
        className={className}
        style={{
          background: "#f0ede8",
          border: "1px dashed #d1cfc9",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#a8a49c",
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          minHeight: "90px",
          ...style,
        }}
      >
        Ad Slot: {slot}
      </div>
    );
  }

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className || ""}`}
      style={{ display: "block", ...style }}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
