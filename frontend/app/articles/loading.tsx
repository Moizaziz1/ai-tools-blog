export default function Loading() {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <div className="skeleton" style={{ width: "120px", height: "16px", marginBottom: "1rem" }} />
        <div className="skeleton" style={{ width: "300px", height: "32px", marginBottom: "0.5rem" }} />
        <div className="skeleton" style={{ width: "200px", height: "16px" }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "1.25rem" }}>
            <div className="skeleton" style={{ width: "100%", height: "180px", marginBottom: "1rem" }} />
            <div className="skeleton" style={{ width: "80px", height: "20px", marginBottom: "0.75rem" }} />
            <div className="skeleton" style={{ width: "100%", height: "20px", marginBottom: "0.5rem" }} />
            <div className="skeleton" style={{ width: "80%", height: "16px", marginBottom: "1rem" }} />
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <div className="skeleton" style={{ width: "60px", height: "14px" }} />
              <div className="skeleton" style={{ width: "80px", height: "14px" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
