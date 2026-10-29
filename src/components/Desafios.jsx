import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { buscarJogo, capaDoJogo, trocarParaCapaReserva } from "../data/jogos";
import { categorias, runs, formatarTempo } from "../data/desafios";

/*
  Componente: Desafios
  O que faz: mostra as categorias de corrida como botões-filtro.
  Ao clicar em uma categoria, só aparecem as runs dela.
  Se a pessoa chegou pela página inicial clicando em uma categoria,
  ela já vem selecionada (o dado vem pelo "location.state").
*/
export default function Desafios() {
  const location = useLocation();

  // Categoria selecionada agora ("Todas" = sem filtro)
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(
    location.state?.categoria || "Todas",
  );

  /*
    Função: selecionarCategoria
    O que faz: seleciona a categoria clicada. Se clicar na que já está
    selecionada, o filtro é removido e volta para "Todas".
  */
  function selecionarCategoria(nome) {
    if (categoriaSelecionada === nome) {
      setCategoriaSelecionada("Todas");
    } else {
      setCategoriaSelecionada(nome);
    }
  }

  // Lista de runs que aparece na tela, já filtrada
  const runsFiltradas =
    categoriaSelecionada === "Todas"
      ? runs
      : runs.filter((run) => run.categoria === categoriaSelecionada);

  // Dados da categoria selecionada (para mostrar a descrição)
  const categoriaAtual = categorias.find(
    (c) => c.nome === categoriaSelecionada,
  );

  return (
    <div className="w-full bg-gray-600 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 p-6 max-w-6xl w-full mx-auto">
        <h1 className="text-white text-3xl font-bold mb-6 text-center">
          Desafios
        </h1>

        {/* Botões de filtro */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <button
            onClick={() => setCategoriaSelecionada("Todas")}
            className={`px-4 py-2 rounded-2xl font-bold text-sm transition-all active:scale-95 cursor-pointer ${
              categoriaSelecionada === "Todas"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-500 text-black"
            }`}
          >
            Todas
          </button>
          {categorias.map((categoria) => (
            <button
              key={categoria.nome}
              onClick={() => selecionarCategoria(categoria.nome)}
              className={`px-4 py-2 rounded-2xl font-bold text-sm transition-all active:scale-95 cursor-pointer ${
                categoriaSelecionada === categoria.nome
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-500 text-black"
              }`}
            >
              {categoria.icone} {categoria.nome}
            </button>
          ))}
        </div>

        {/* Descrição da categoria escolhida */}
        <p className="text-gray-200 text-sm text-center mb-8">
          {categoriaAtual
            ? categoriaAtual.descricao
            : "Mostrando as runs de todas as categorias."}{" "}
          ({runsFiltradas.length} runs)
        </p>

        {/* Cards das runs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {runsFiltradas.map((run) => {
            const jogo = buscarJogo(run.jogoId);
            return (
              <div
                key={run.id}
                className="flex gap-4 bg-gray-200 shadow-lg rounded-lg p-4 transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={capaDoJogo(jogo.steamId)}
                  onError={(e) => trocarParaCapaReserva(e, jogo.steamId)}
                  alt={`Capa de ${jogo.nome}`}
                  className="h-28 w-20 object-cover rounded-lg"
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-black font-bold">{jogo.nome}</h2>
                    <span className="inline-block bg-green-400 text-black text-xs font-bold px-2 py-1 rounded-2xl mt-1">
                      {run.categoria}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-800 text-sm font-medium">
                      {run.jogador}{" "}
                      <span className="text-lg">{run.nacionalidade}</span>
                    </p>
                    <p className="text-gray-600 text-sm font-semibold">
                      {formatarTempo(run.tempo)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
