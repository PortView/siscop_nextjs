import { ReactNode } from "react";

export default function Principal({ children }: { children: ReactNode }) {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] w-full bg-gray-100 dark:bg-gray-900 rounded-lg shadow-inner p-8 mt-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 text-center">
        Bem-vindo ao Sistema de Controle de Processos
      </h1>
      <p className="text-gray-600 dark:text-gray-300 text-center text-base md:text-lg">
        Selecione uma opção no menu superior para começar
      </p>
      {children}
    </section>
  );
}
