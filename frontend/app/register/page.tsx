"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function register(e: any) {
    e.preventDefault();
    setMsg("");

    try {
      await api.post("/auth/register", { email, password });
      router.push("/login?created=true");
    } catch {
      setMsg("Ошибка регистрации");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <form className="bg-slate-800 p-6 rounded-xl w-80 space-y-3" onSubmit={register}>
        <h2 className="text-xl font-bold mb-4 text-center">Создать аккаунт</h2>

        <input
          className="w-full p-2 rounded bg-slate-700"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 rounded bg-slate-700"
          placeholder="Пароль..."
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {msg && <p className="text-red-400 text-sm">{msg}</p>}

        <button className="w-full p-2 bg-blue-600 rounded hover:bg-blue-500">
          Регистрация
        </button>

        <p className="text-sm text-gray-400 text-center">
          Уже есть аккаунт? <a href="/login" className="text-blue-400">Войти</a>
        </p>
      </form>
    </main>
  );
}
