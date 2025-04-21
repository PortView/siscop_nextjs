"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/MainLayout";
import Principal from "@/components/Principal";

export default function DashboardPage() {
  interface Usuario {
  id: number;
  email: string;
  name: string;
  cod: number;
  tipo: string;
  mvvm: string;
  codcargo: number;
}

const [user, setUser] = useState<Usuario | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const userData = localStorage.getItem("user");
    if (!token || !userData) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
        <div className="text-blue-600 font-bold text-xl">Carregando...</div>
      </div>
    );
  }

  // Funções para tema e logoff (mock)
  const handleToggleTheme = () => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark");
    }
  };
  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <MainLayout
      user={{
        name: user.name,
        cargo: user.tipo,
        avatarUrl: undefined,
      }}
      onToggleTheme={handleToggleTheme}
      onLogout={handleLogout}
    >
      <Principal children={undefined} />
    </MainLayout>
  );
}
