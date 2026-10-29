import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { jogos, capaDoJogo, trocarParaCapaReserva } from "../data/jogos";

/*
  Componente: Jogos
  O que faz: página "biblioteca". Mostra a capa de todos os jogos da lista
  com 30px de espaço entre elas. Ao passar o mouse, a capa sobe e aumenta
  um pouquinho (efeito hover).
*/
export default function Jogos() {
  return (
    <div className="w-full bg-gray-600 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 p-6">
        <h1 className="text-white text-3xl font-bold mb-8 text-center">
          Biblioteca de Jogos
        </h1>

        {/* gap-[30px] = 30px de espaço entre as capas */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[30px] max-w-6xl mx-auto">
          {jogos.map((jogo) => (
            <div
              key={jogo.id}
              className="flex flex-col gap-2 cursor-pointer transition-all duration-300 hover:-translate-y-3 hover:scale-105"
            >
              <img
                src={capaDoJogo(jogo.steamId)}
                onError={(e) => trocarParaCapaReserva(e, jogo.steamId)}
                alt={`Capa de ${jogo.nome}`}
                className="w-full aspect-[2/3] object-cover rounded-lg shadow-lg hover:shadow-2xl"
              />
              <p className="text-white text-sm font-bold text-center">
                {jogo.nome}
              </p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
