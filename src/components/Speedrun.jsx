import React from "react";
// Link troca de página sem recarregar o site (substitui a tag <a>)
import { Link } from "react-router-dom";
// NOVO: navbar e footer agora são componentes compartilhados
import Navbar from "./Navbar";
import Footer from "./Footer";
// NOVO: categorias vêm do arquivo de dados
import { categorias } from "../data/desafios";

// ALTERADO: adicionei mais jogadores (os 2 primeiros são os originais)
const leaderboardDados = [
  { id: 1, nome: "zZoink", tempo: "00m 00s 045ms", nacionalidade: "🇧🇷" },
  { id: 2, nome: "Cynical", tempo: "00m 01s 012ms", nacionalidade: "🇺🇸" },
  { id: 3, nome: "KaitoSpeed", tempo: "00m 01s 187ms", nacionalidade: "🇯🇵" },
  { id: 4, nome: "LambdaRush", tempo: "00m 01s 342ms", nacionalidade: "🇩🇪" },
  { id: 5, nome: "Brisa_BR", tempo: "00m 01s 506ms", nacionalidade: "🇧🇷" },
  { id: 6, nome: "ApertureAna", tempo: "00m 01s 689ms", nacionalidade: "🇪🇸" },
  { id: 7, nome: "StyxSprint", tempo: "00m 01s 874ms", nacionalidade: "🇫🇷" },
  { id: 8, nome: "VoidWalker", tempo: "00m 02s 031ms", nacionalidade: "🇬🇧" },
];

// NOVO: números de exemplo para o banner da página inicial (demonstrativo)
const estatisticas = [
  { id: 1, valor: "1.248", titulo: "Corredores" },
  { id: 2, valor: "48.375", titulo: "Runs enviadas" },
  { id: 3, valor: "20", titulo: "Jogos na biblioteca" },
];

export default function Principal() {
  return (
    // ALTERADO: adicionei "flex flex-col" para o footer ficar sempre no final da tela
    <div className="w-full bg-gray-600 min-h-screen flex flex-col">
      {/* 1. NAVBAR (ALTERADO: agora é o componente Navbar, com os mesmos botões de antes) */}
      <Navbar />

      {/* NOVO: banner de boas-vindas com estatísticas e atalhos */}
      <section className="mx-6 mt-6 bg-gray-800 shadow-lg rounded-lg p-6 flex flex-wrap justify-between items-center gap-6">
        <div>
          <h2 className="text-white text-2xl font-bold">
            Bem-vindo, speedrunner! 🏁
          </h2>
          <p className="text-gray-300 text-sm mt-1">
            Explore os jogos, escolha uma categoria e tente bater os recordes.
          </p>
          <div className="flex gap-2 mt-4">
            <Link
              to="/jogos"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl font-bold text-sm transition-all active:scale-95 cursor-pointer"
            >
              Ver jogos
            </Link>
            <Link
              to="/desafios"
              className="bg-gray-200 hover:bg-gray-500 text-black px-4 py-2 rounded-2xl font-bold text-sm transition-all active:scale-95 cursor-pointer"
            >
              Ver desafios
            </Link>
          </div>
        </div>

        <div className="flex gap-4">
          {estatisticas.map((item) => (
            <div
              key={item.id}
              className="bg-gray-600 rounded-lg px-5 py-3 text-center"
            >
              <p className="text-green-400 text-2xl font-bold">{item.valor}</p>
              <p className="text-gray-200 text-xs font-semibold">
                {item.titulo}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. CONTEÚDO PRINCIPAL (ABAIXO DA NAVBAR) */}
      {/* ALTERADO: adicionei "flex-1" para o conteúdo ocupar o espaço e empurrar o footer */}
      <main className="flex flex-1 justify-between items-start p-6 gap-6">
        {/* NOVO: esta div agrupa os dois cards da esquerda, um embaixo do outro */}
        <div className="flex flex-col gap-6">
          {/* Esquerda: Jogos mais competidos */}
          <div className="flex flex-col justify-between items-center bg-blue-300 shadow-lg rounded-lg p-6 w-160 gap-6">
            <h1 className="text-white text-xl font-bold mb-4">
              Jogos mais competidos
            </h1>
            <div className="flex flex-row flex-wrap gap-4 items-center">
              <img
                src="https://imgs.search.brave.com/w9iPmckcMNwnm-d61FCYx0xfhsCYi90cdoR7_LwoNHU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvdGh1bWJu/YWlsL21pbmVjcmFm/dC1wcm9maWxlLXBp/Y3R1cmVzLTczNi14/LTEzMDgtYnZyOGM2/OHJ4YnBtNjJ3Mi5q/cGc"
                alt=""
                className="h-40 w-30 object-cover"
              />
              <img
                src="https://imgs.search.brave.com/MUT0KV2xKKmcyXssa3qhpc_81yrh8XyLS-Tt2jd1GSI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hcmNo/aXZlLm9yZy9kb3du/bG9hZC9IYWxmLUxp/ZmUtMi1SZXRhaWwt/MjE1My9BcnQlMjBh/bmQlMjBEb2NzL0hh/bGYtTGlmZSUyMDIl/MjBCb3glMjBGcm9u/dC5qcGc"
                alt=""
                className="h-40 w-30 object-cover"
              />
              <img
                src="https://imgs.search.brave.com/CrP7qVZB4NZ1SHfzTQ0GbBCkm2jpX4WEoqsmUDkzHRw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/Z2l2ZS1tZS15b3Vy/LWJlc3QtdWx0cmFr/aWxsLXBob25lLXdh/bGxwYXBlcnMtdjAt/ZHZhaGtqd3ZrZWFl/MS5wbmc_d2lkdGg9/MjE2MCZmb3JtYXQ9/cG5nJmF1dG89d2Vi/cCZzPTgwYjhhODAw/M2ZkNDZjMDE1OTM1/Y2Y2NDNmMDI0MGUz/YmRiNDEwNzg"
                alt=""
                className="h-40 w-30 object-cover"
              />
              <img
                src="https://imgs.search.brave.com/SyLTUJBQm-z63tTUKlvVZqOWypXXp86f506z6BArujw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9nZWVr/Z2FtZXItY2FwYXMu/bnljMy5jZG4uZGln/aXRhbG9jZWFuc3Bh/Y2VzLmNvbS83ZGc1/d3pwcC5qcGc"
                alt=""
                className="h-40 w-30 object-cover"
              />
            </div>
          </div>

          {/* NOVO: Categorias mais competidas */}
          {/* Cada categoria é um Link para a página /desafios, já com o filtro aplicado */}
          <div className="flex flex-col items-center bg-gray-200 shadow-lg rounded-lg p-6 w-160 gap-4">
            <h1 className="text-black text-xl font-bold mb-2">
              Categorias mais competidas
            </h1>
            <div className="grid grid-cols-2 gap-4 w-full">
              {categorias.map((categoria) => (
                <Link
                  key={categoria.nome}
                  to="/desafios"
                  state={{ categoria: categoria.nome }}
                  className="flex flex-col gap-1 bg-white rounded-lg p-4 shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                >
                  <span className="text-black font-bold">
                    {categoria.icone} {categoria.nome}
                  </span>
                  <span className="text-gray-600 text-xs">
                    {categoria.descricao}
                  </span>
                  <span className="text-green-700 text-xs font-bold mt-1">
                    {categoria.corridas.toLocaleString("pt-BR")} runs
                  </span>
                </Link>
              ))}
            </div>
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

      {/* NOVO: rodapé com a assinatura do criador */}
      <Footer />
    </div>
  );
}
