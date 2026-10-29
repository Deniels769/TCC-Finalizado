import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { validarEmail } from "../utils/validacoes";

const LIMITE_CARACTERES = 1000;

// Classe repetida nos campos do formulário
const estiloCampo =
  "w-full px-4 py-2 rounded-2xl bg-white text-black text-sm border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400";

/*
  Componente: Suporte
  O que faz: formulário para falar com o suporte (e-mail, título e mensagem
  de até 1000 caracteres). Ao enviar, mostra um feedback, limpa os campos
  e recarrega a página depois de 3 segundos.
*/
export default function Suporte() {
  const [email, setEmail] = useState("");
  const [titulo, setTitulo] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [enviado, setEnviado] = useState(false);

  // Guarda o cronômetro do recarregamento para podermos cancelá-lo
  const cronometroRef = useRef(null);

  // Cancela o cronômetro se a pessoa sair da página antes dos 3 segundos
  useEffect(() => {
    return () => clearTimeout(cronometroRef.current);
  }, []);

  /*
    Função: enviarMensagem
    O que faz: valida os campos. Se estiver tudo certo, mostra o feedback,
    apaga os campos e agenda o recarregamento da página.
    Funciona no botão e também com a tecla Enter (por causa do <form>).
    Atenção: sem back-end, a mensagem NÃO é enviada para ninguém (demonstrativo).
  */
  function enviarMensagem(evento) {
    evento.preventDefault();
    setErro("");

    if (!validarEmail(email)) {
      setErro("Digite um e-mail válido. Exemplo: nome@email.com");
      return;
    }
    if (titulo.trim().length < 3) {
      setErro("Digite um título para o problema (mínimo 3 letras).");
      return;
    }
    if (mensagem.trim() === "") {
      setErro("Descreva o seu problema na caixa de mensagem.");
      return;
    }

    // Feedback na tela e campos apagados
    setEnviado(true);
    setEmail("");
    setTitulo("");
    setMensagem("");

    // Depois de 3 segundos, recarrega a página
    cronometroRef.current = setTimeout(() => {
      window.location.reload();
    }, 3000);
  }

  return (
    <div className="w-full bg-gray-600 min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex justify-center items-start p-6">
        <div className="bg-gray-200 shadow-lg rounded-lg p-8 w-full max-w-lg">
          <h1 className="text-black text-2xl font-bold mb-2 text-center">
            Suporte
          </h1>
          <p className="text-gray-700 text-sm text-center mb-6">
            Teve algum problema? Conte para a gente!
          </p>

          <form onSubmit={enviarMensagem} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="suporte-email"
                className="text-gray-800 text-sm font-bold"
              >
                E-mail
              </label>
              <input
                id="suporte-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@email.com"
                className={estiloCampo}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="suporte-titulo"
                className="text-gray-800 text-sm font-bold"
              >
                Título do problema
              </label>
              <input
                id="suporte-titulo"
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex: Não consigo enviar minha run"
                className={estiloCampo}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="suporte-mensagem"
                className="text-gray-800 text-sm font-bold"
              >
                Mensagem
              </label>
              {/* maxLength impede de digitar mais que 1000 caracteres */}
              <textarea
                id="suporte-mensagem"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                maxLength={LIMITE_CARACTERES}
                rows={6}
                placeholder="Descreva o que aconteceu..."
                className={`${estiloCampo} resize-none rounded-lg`}
              />
              {/* Contador de caracteres */}
              <p className="text-gray-600 text-xs text-right">
                {mensagem.length}/{LIMITE_CARACTERES}
              </p>
            </div>

            {erro && (
              <p className="text-red-600 text-sm font-semibold text-center">
                {erro}
              </p>
            )}

            {/* Feedback positivo */}
            {enviado && (
              <p className="text-green-700 text-sm font-semibold text-center">
                ✅ Mensagem enviada! Em breve a página será recarregada. (Envio
                demonstrativo)
              </p>
            )}

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl font-bold text-sm transition-all active:scale-95 cursor-pointer"
            >
              Enviar
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
