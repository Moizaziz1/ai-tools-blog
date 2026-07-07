import { AuthProvider } from "@/lib/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div style={{ minHeight: "100vh", background: "#f8f7fc" }}>
        {children}
      </div>
    </AuthProvider>
  );
}
