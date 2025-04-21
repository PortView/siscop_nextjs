import { ReactNode } from "react";

interface MainLayoutProps {
  user: {
    name: string;
    cargo: string;
    avatarUrl?: string;
  };
  onToggleTheme: () => void;
  onLogout: () => void;
  children?: React.ReactNode; // ← Adicione esta linha

}

import TopMenu from "./TopMenu";
import { useEffect, useState } from "react";

export default function MainLayout({ user, children, onToggleTheme, onLogout }: MainLayoutProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme as 'dark' | 'light');
  }, []);
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  // useEffect(() => {
  //   if (theme === 'dark') {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }
  //   localStorage.setItem('theme', theme);
  // }, [theme]);

  // useEffect(() => {
  //   if (theme === 'dark') {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }
  // }, [theme]);

  const handleToggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  // return (
  //   <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
  //     <TopMenu user={user} onToggleTheme={handleToggleTheme} onLogout={onLogout} theme={theme} />
  //     <main className="flex-1 p-6 md:p-12 flex flex-col items-center justify-center">
  //       {children}
  //     </main>
  //   </div>
  // );
  return (
    <div className="min-h-screen flex flex-col">
      <TopMenu
        user={user}
        onToggleTheme={onToggleTheme}
        onLogout={onLogout}
        theme={theme}
      />
      <main className="flex-1 p-4 md:p-8">
        {children} {/* ← Garanta que está renderizando as children aqui */}
      </main>
    </div>
  );
}
