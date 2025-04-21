import { Fragment } from "react";

interface TopMenuProps {
  user: {
    name: string;
    cargo: string;
    avatarUrl?: string;
  };
  onToggleTheme: () => void;
  onLogout: () => void;
  theme: 'dark' | 'light';
}

const menu = [
  {
    label: "Administração",
    subItems: ["Atribuições", "Atribuições Receitas Cargo"],
  },
  {
    label: "Cadastro",
    subItems: ["Clientes", "Imóveis", "Contratos"],
  },
  {
    label: "Gerência",
    subItems: [
      "Controle de Processos",
      "Lib.Fatur. Gerência",
      "Lib.Fixa. Gerência",
      "Copia de Conf. p/outro imóvel",
      "Copia de Conf. p/vários imóvel",
    ],
  },
  {
    label: "Técnico",
    subItems: ["Analista"],
  },
  {
    label: "Consultas",
    subItems: [
      "Aval Conformidade",
      "Planilhas dinâmicas",
      "Medição / Cliente",
      "Medição / Faturamento",
      "Pendências",
      "Emol. Pagos",
      "Faturamento Gerencia",
      "Prod. / Faturamento",
      "Verificação",
    ],
  },
];

export default function TopMenu({ user, onToggleTheme, onLogout, theme }: TopMenuProps) {
  return (
    <header className="w-full bg-gray-300 dark:bg-gray-800 border-b border-gray-400 dark:border-gray-700 shadow flex items-center px-4 md:px-8 h-16 select-none">
      {/* Esquerda: Nome do sistema */}
      <div className="flex items-center flex-shrink-0">
        <a href="/" className="text-2xl font-bold text-gray-900 dark:text-gray-100 hover:text-zinc-300 mr-10">Siscop</a>
      </div>
      {/* Esquerda: Menu */}
      <nav className="flex-1 flex justify-left bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <ul className="flex gap-4 md:gap-8 max-w-screen-xl flex-wrap items-center justify-between mx-auto p-4 dark:bg-gray-800">
          {menu.map((item) => (
            <li key={item.label} className="relative group">
              <button className="font-semibold text-gray-800 dark:text-gray-100 hover:text-sky-700 dark:hover:text-sky-300 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-sky-400 transition">
                {item.label}
              </button>
              {/* Submenu */}
              <ul className="absolute left-1/2 -translate-x-1/2 top-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 shadow-lg rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto z-50 transition-all duration-200">
                {item.subItems.map((sub) => (
                  <li key={sub}>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-sky-100 dark:hover:bg-sky-800 rounded"
                    >
                      {sub}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
      {/* Direita: Usuário, avatar, modo, logoff */}
      <div className="flex items-center gap-4 ml-4">
        <div className="flex flex-col items-end">
          <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-tight">{user.name}</span>
          <span className="text-xs text-gray-700 dark:text-gray-300">{user.cargo}</span>
        </div>
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-sky-700 flex items-center justify-center text-white font-bold text-lg border-2 border-sky-200 dark:border-sky-700">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt="Avatar" className="w-full h-full rounded-full object-cover" />
          ) : (
            user.name[0]
          )}
        </div>
        {/* Botão modo dark/light */}
        <button
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
          title={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {theme === 'dark' ? (
            // Ícone de sol (tema claro)
            <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/><path stroke="currentColor" strokeWidth="2" d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41"/></svg>
          ) : (
            // Ícone de lua (tema escuro)
            <svg className="w-5 h-5 text-gray-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/></svg>
          )}
        </button>
        {/* Botão logoff */}
        <button
          onClick={onLogout}
          aria-label="Sair do sistema"
          className="p-2 rounded hover:bg-red-100 dark:hover:bg-red-900 transition"
        >
          <svg className="w-5 h-5 text-red-700 dark:text-red-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5" /></svg>
        </button>
      </div>
    </header>
  );
}
