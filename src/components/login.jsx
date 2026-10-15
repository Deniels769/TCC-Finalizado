import React from "react";


export function login() {
    return(
        <div>
             {/* 1. NAVBAR */}
      <nav className="flex w-full justify-between items-center p-4 border-b border-gray-100">
        {/* Lado Esquerdo: Jogos, Desafios, Suporte */}
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-500 text-black px-4 py-2 rounded-2xl font-bold text-sm transition-all active:scale-95 cursor-pointer">
            Jogos
          </button>
          <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-500 text-black px-4 py-2 rounded-2xl font-bold text-sm transition-all active:scale-95 cursor-pointer">
            Desafios
          </button>
          <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-500 text-black px-4 py-2 rounded-2xl font-bold text-sm transition-all active:scale-95 cursor-pointer">
            Suporte
          </button>
        </div>

        {/* Lado Direito: Pesquisar, Envie sua run, Criar conta */}
        <div className="flex gap-2">
          <div className="flex items-center justify-start gap-2 bg-gray-400 hover:bg-gray-500 text-black px-6 py-2 rounded-2xl font-bold text-sm cursor-pointer">
            Pesquisar
          </div>

          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl font-bold text-sm transition-all active:scale-95 cursor-pointer">
            Envie sua run
          </button>
            <a rel="stylesheet" href="/components/login">
          <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-500 text-black px-4 py-2 rounded-2xl font-bold text-sm transition-all active:scale-95 cursor-pointer">
            Entrar
          </button>
          </a>
        </div>
      </nav>

        </div>
    )
}