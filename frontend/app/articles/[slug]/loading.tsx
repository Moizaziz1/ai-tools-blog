export default function Loading() {
  return (
    <div>
      <div style={{ background: "var(--bg-hover)", padding: "2.5rem 1.5rem", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div className="skeleton" style={{ width: "120px", height: "14px", marginBottom: "1.5rem" }} />
          <div className="skeleton" style={{ width: "80px", height: "24px", borderRadius: "100px", marginBottom: "1rem" }} />
          <div className="skeleton" style={{ width: "600px", height: "36px", marginBottom: "1.25rem" }} />
          <div style={{ display: "flex", gap: "1.25rem" }}>
            <div className="skeleton" style={{ width: "100px", height: "14px" }} />
            <div className="skeleton" style={{ width: "80px", height: "14px" }} />
            <div className="skeleton" style={{ width: "100px", height: "14px" }} />
          </div>
        </div>
      </div>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        <div className="layout-two-col" style={{ gap: "3.5rem" }}>
          <div>
            <div className="skeleton" style={{ width: "100%", height: "80px", marginBottom: "2.5rem", borderRadius: "0 12px 12px 0" }} />
            <div className="skeleton" style={{ width: "100%", height: "400px", marginBottom: "1rem" }} />
            <div className="skeleton" style={{ width: "100%", height: "20px", marginBottom: "0.75rem" }} />
            <div className="skeleton" style={{ width: "100%", height: "20px", marginBottom: "0.75rem" }} />
            <div className="skeleton" style={{ width: "80%", height: "20px", marginBottom: "2rem" }} />
            <div className="skeleton" style={{ width: "100%", height: "250px" }} />
          </div>
          <div>
            <div className="skeleton" style={{ width: "100%", height: "200px", marginBottom: "1.25rem", borderRadius: "14px" }} />
            <div className="skeleton" style={{ width: "100%", height: "150px", borderRadius: "14px" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
