"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SessionTimeout from "./SessionTimeout";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.replace("/login?reason=unauthorized");
      return;
    }

    setAllowed(true);
  }, [router]);

  if (allowed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-gray-400 text-lg">Validating session...</div>
      </div>
    );
  }

  return (
    <>
      <SessionTimeout
        timeoutMinutes={15}
        onTimeout={() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("role");
          router.replace("/login?reason=session_timeout");
        }}
      />

      {children}
    </>
  );
}
