import React from "react";

/*
  Componente: Footer
  O que faz: mostra o rodapé com a assinatura do criador.
  O ano é pego automaticamente do computador (new Date().getFullYear()).
*/
export default function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className="w-full bg-green-400 border-t border-gray-100 p-4 text-center text-black text-sm font-bold">
      © {anoAtual} • Criado por Daniel Carvalho Ribeiro
    </footer>
  );
}
