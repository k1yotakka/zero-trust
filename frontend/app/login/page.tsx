"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function login(e: any) {
    e.preventDefault();
    setMsg("");

    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("role", res.data.user.role);

      router.push("/dashboard");
    } catch {
      setMsg("Ошибка входа");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <form
        className="bg-slate-800 p-6 rounded-xl w-80 space-y-3"
        onSubmit={login}
      >
        <h2 className="text-xl font-bold mb-4">Вход</h2>

        <input
          className="w-full p-2 rounded bg-slate-700"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 rounded bg-slate-700"
          placeholder="Пароль..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {msg && <p className="text-red-400 text-sm">{msg}</p>}

        <button className="w-full p-2 bg-blue-600 rounded hover:bg-blue-500">
          Войти
        </button>

        <p className="text-center text-sm text-gray-400">
          Нет аккаунта?{" "}
          <a href="/register" className="text-blue-400 hover:text-blue-300">
            Зарегистрироваться
          </a>
        </p>
      </form>
    </main>
  );
}
