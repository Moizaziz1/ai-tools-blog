"use client";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function AdminIndex() {
  const { token, isLoading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading) {
      router.replace(token ? "/admin/dashboard" : "/admin/login");
    }
  }, [token, isLoading, router]);
  return null;
}
