import React, { useState } from "react";
import { Link } from "react-router-dom";
import ModalRun from "./ModalRun";

// Classe repetida nos botões cinza (para não escrever tudo várias vezes)
const estiloBotaoCinza =
  "flex items-center gap-2 bg-gray-200 hover:bg-gray-500 text-black px-4 py-2 rounded-2xl font-bold text-sm transition-all active:scale-95 cursor-pointer";

/*
  Componente: Navbar
  O que faz: é a barra verde do topo, usada em TODAS as páginas.
  Ela também controla se o modal "Envie sua run" está aberto ou fechado.
*/
export default function Navbar() {
  // true = modal aberto | false = modal fechado
  const [modalAberto, setModalAberto] = useState(false);

  /*
    Função: abrirModal
    O que faz: abre a janela (modal) de envio de run.
  */
  function abrirModal() {
    setModalAberto(true);
  }

  /*
    Função: fecharModal
    O que faz: fecha a janela (modal) de envio de run.
  */
  function fecharModal() {
    setModalAberto(false);
  }

  return (
    <>
      {/* 1. NAVBAR */}
      <nav className="flex w-full justify-between items-center p-4 border-b border-gray-100 bg-green-400">
        {/* Lado Esquerdo: Início, Jogos, Desafios, Suporte */}
        <div className="flex gap-2">
          {/* NOVO: botão Início, para voltar à página principal de qualquer página */}
          <Link to="/" className={estiloBotaoCinza}>
            Início
          </Link>
          <Link to="/jogos" className={estiloBotaoCinza}>
            Jogos
          </Link>
          <Link to="/desafios" className={estiloBotaoCinza}>
            Desafios
          </Link>
          <Link to="/suporte" className={estiloBotaoCinza}>
            Suporte
          </Link>
        </div>

        {/* Lado Direito: Pesquisar, Envie sua run, Entrar */}
        <div className="flex gap-2">
          <div className="flex items-center justify-start gap-2 bg-gray-400 hover:bg-gray-500 text-black px-6 py-2 rounded-2xl font-bold text-sm cursor-pointer">
            Pesquisar
          </div>

          {/* ALTERADO: agora o botão abre o modal */}
          <button
            onClick={abrirModal}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl font-bold text-sm transition-all active:scale-95 cursor-pointer"
          >
            Envie sua run
          </button>
          <Link to="/login">
            <button className={estiloBotaoCinza}>Entrar</button>
          </Link>
        </div>
      </nav>

      {/* O modal só existe na tela quando modalAberto é true */}
      {modalAberto && <ModalRun onFechar={fecharModal} />}
    </>
  );
}
