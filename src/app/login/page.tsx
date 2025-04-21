"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 5) {
      setError("A senha deve ter pelo menos 5 caracteres.");
      return;
    }
    setLoading(true);
    try {
      // Usar a variável correta do .env
      const authUrl = process.env.NEXT_PUBLIC_API_AUTH_URL || process.env.API_AUTH_URL;
      if (!authUrl) throw new Error("URL de autenticação não configurada.");
      const res = await fetch(authUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Falha na autenticação.");
      const { access_token } = await res.json();
      if (!access_token) throw new Error("Token não recebido.");
      localStorage.setItem("access_token", access_token);
      // Buscar dados do usuário
      const meUrl = process.env.NEXT_PUBLIC_API_ME_URL || process.env.API_ME_URL;
      if (!meUrl) throw new Error("URL de usuário não configurada.");
      const meRes = await fetch(meUrl, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      if (!meRes.ok) throw new Error("Falha ao buscar dados do usuário.");
      const user = await meRes.json();
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Erro desconhecido.");
      } else {
        setError("Erro desconhecido.");
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-900 via-sky-700 to-sky-500 px-2">
      <form
        onSubmit={handleSubmit}
        className="bg-white/95 shadow-2xl rounded-2xl p-8 w-full max-w-md flex flex-col gap-6 border border-sky-200 backdrop-blur-sm"
        autoComplete="off"
      >
        <h1 className="text-3xl font-extrabold text-sky-900 mb-2 text-center tracking-tight">Acesso ao Sistema</h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-semibold text-sky-800">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="Digite seu e-mail"
            className="rounded-lg border border-sky-400 focus:border-sky-700 focus:ring-2 focus:ring-sky-300 bg-white text-sky-900 px-4 py-3 outline-none placeholder:text-sky-400 transition-all shadow-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="font-semibold text-sky-800">Senha</label>
          <input
            id="password"
            type="password"
            placeholder="Digite sua senha"
            className="rounded-lg border border-sky-400 focus:border-sky-700 focus:ring-2 focus:ring-sky-300 bg-white text-sky-900 px-4 py-3 outline-none placeholder:text-sky-400 transition-all shadow-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && (
          <div className="text-red-700 text-sm font-semibold bg-red-50 border border-red-200 rounded px-3 py-2 mt-1 text-center animate-pulse">{error}</div>
        )}
        <button
          type="submit"
          className="bg-gradient-to-r from-sky-700 to-sky-500 text-white font-bold py-3 rounded-lg hover:from-sky-800 hover:to-sky-600 transition-all shadow-md mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
              Entrando...
            </span>
          ) : "Entrar"}
        </button>
        <div className="text-xs text-center text-sky-700/60 mt-4 select-none">
          © {new Date().getFullYear()} SISCOP - Todos os direitos reservados
        </div>
      </form>
    </div>
  );
}

