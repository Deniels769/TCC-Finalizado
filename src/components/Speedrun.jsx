import React from "react";
const leaderboardDados = [
  { id: 1, nome: "zZoink", tempo: "00m 00s 045ms", nacionalidade: "🇧🇷" },
  { id: 2, nome: "Cynical", tempo: "00m 01s 012", nacionalidade: "🇺🇸" },]

export default function Principal() {
  return (
    <div className="w-full bg-gray-600 min-h-screen">
      {/* 1. NAVBAR */}
      <nav className="flex w-full justify-between items-center p-4 border-b border-gray-100 bg-green-400">
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
              <a rel="stylesheet" href="/components/login" >
          <button className="flex items-center gap-2 bg-gray-200 hover:bg-gray-500 text-black px-4 py-2 rounded-2xl font-bold text-sm transition-all active:scale-95 cursor-pointer">
            Entrar
          </button>
              </a>
        </div>
      </nav>

      {/* 2. CONTEÚDO PRINCIPAL (ABAIXO DA NAVBAR) */}
      <main className="flex justify-between items-start p-6 gap-6">
        {/* Esquerda: Jogos mais competidos */}
        <div className="flex flex-col justify-between items-center bg-blue-300 shadow-lg rounded-lg p-6 w-160 gap-6">
          <h1 className="text-white text-xl font-bold mb-4">
            Jogos mais competidos
          </h1>
          <div className="flex flex-row flex-wrap gap-4 items-center">
          <img src="https://imgs.search.brave.com/w9iPmckcMNwnm-d61FCYx0xfhsCYi90cdoR7_LwoNHU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvdGh1bWJu/YWlsL21pbmVjcmFm/dC1wcm9maWxlLXBp/Y3R1cmVzLTczNi14/LTEzMDgtYnZyOGM2/OHJ4YnBtNjJ3Mi5q/cGc" alt=""  className="h-40 w-30 object-cover"/>
          <img src="https://imgs.search.brave.com/MUT0KV2xKKmcyXssa3qhpc_81yrh8XyLS-Tt2jd1GSI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hcmNo/aXZlLm9yZy9kb3du/bG9hZC9IYWxmLUxp/ZmUtMi1SZXRhaWwt/MjE1My9BcnQlMjBh/bmQlMjBEb2NzL0hh/bGYtTGlmZSUyMDIl/MjBCb3glMjBGcm9u/dC5qcGc" alt=""  className="h-40 w-30 object-cover"/>
          <img src="https://imgs.search.brave.com/CrP7qVZB4NZ1SHfzTQ0GbBCkm2jpX4WEoqsmUDkzHRw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/Z2l2ZS1tZS15b3Vy/LWJlc3QtdWx0cmFr/aWxsLXBob25lLXdh/bGxwYXBlcnMtdjAt/ZHZhaGtqd3ZrZWFl/MS5wbmc_d2lkdGg9/MjE2MCZmb3JtYXQ9/cG5nJmF1dG89d2Vi/cCZzPTgwYjhhODAw/M2ZkNDZjMDE1OTM1/Y2Y2NDNmMDI0MGUz/YmRiNDEwNzg" alt=""  className="h-40 w-30 object-cover"/>
          <img src="https://imgs.search.brave.com/SyLTUJBQm-z63tTUKlvVZqOWypXXp86f506z6BArujw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9nZWVr/Z2FtZXItY2FwYXMu/bnljMy5jZG4uZGln/aXRhbG9jZWFuc3Bh/Y2VzLmNvbS83ZGc1/d3pwcC5qcGc" alt=""  className="h-40 w-30 object-cover"/>

          </div>
        </div>

        {/* Direita: Leaderboards */}
        <div className="flex flex-col justify-between items-center gap-2 bg-gray-200 shadow-lg rounded-lg p-6 w-80">
          <h1 className="text-black text-xl font-bold mb-4">Leaderboards</h1>

          <div className="w-full divide-y divide-gray-300">
            {leaderboardDados.map((item, index) => (
              <div
                key={item.id}
                className="flex justify-between items-center py-2"
              >
                <span className="text-gray-800 font-medium">
                  {index + 1}. {item.nome}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 text-sm font-semibold">
                    {item.tempo}
                  </span>
                  <span className="text-lg">{item.nacionalidade}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
