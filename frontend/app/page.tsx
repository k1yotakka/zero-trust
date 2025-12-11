"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      router.replace("/dashboard");
    }
  }, []);

  return (
    <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">SecureHub Zero Trust Portal</h1>
        <p className="text-gray-300 mb-6">
          Пожалуйста, войдите, чтобы получить доступ.
        </p>

        <a
          href="/login"
          className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-500"
        >
          Войти
        </a>
      </div>
    </main>
  );
}
