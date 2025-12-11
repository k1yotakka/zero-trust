"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRouter() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role === "admin") router.replace("/dashboard/admin");
    else if (role === "manager") router.replace("/dashboard/manager");
    else router.replace("/dashboard/user");
  }, [router]);

  return (
    <main className="text-white p-6">
      Redirecting...
    </main>
  );
}
