import { Suspense } from "react";
import SearchClient from "./SearchClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Articles",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{padding:"3rem",textAlign:"center",color:"#6b6862"}}>Loading search...</div>}>
      <SearchClient />
    </Suspense>
  );
}
