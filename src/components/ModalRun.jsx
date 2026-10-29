import React, { useState, useEffect, useRef } from "react";
import { jogos } from "../data/jogos";
import { categorias } from "../data/desafios";
import { validarLinkYoutube } from "../utils/validacoes";

// Opções do campo "Plataforma"
const plataformas = [
  "PC",
  "PlayStation",
  "Xbox",
  "Nintendo Switch",
  "Mobile",
  "Outra",
];

/*
  Função: nomeDoUsuarioLogado
  O que faz: se a pessoa estiver logada, pega o nome dela no navegador
  para já deixar o campo "Usuário" preenchido. Se não, devolve vazio.
*/
function nomeDoUsuarioLogado() {
  try {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
    return usuario?.nome || "";
  } catch {
    return "";
  }
}

// Classe repetida nos campos do formulário
const estiloCampo =
  "w-full px-4 py-2 rounded-2xl bg-white text-black text-sm border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400";

/*
  Componente: ModalRun
  O que faz: janela que abre no meio da tela para enviar uma run.
  Tem 3 etapas:
    "formulario"  -> a pessoa preenche os campos
    "confirmacao" -> pergunta "tem certeza?"
    "sucesso"     -> feedback positivo; a janela fecha sozinha em 5 segundos
  Recebe "onFechar", a função que fecha o modal (vem da Navbar).
*/
export default function ModalRun({ onFechar }) {
  const [usuario, setUsuario] = useState(nomeDoUsuarioLogado);
  const [jogo, setJogo] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [categoria, setCategoria] = useState("");
  const [link, setLink] = useState("");
  const [etapa, setEtapa] = useState("formulario");
  const [erro, setErro] = useState("");

  // Guarda o cronômetro dos 5 segundos para podermos cancelá-lo se precisar
  const cronometroRef = useRef(null);

  // Esse efeito limpa o cronômetro quando o modal some (evita erros)
  useEffect(() => {
    return () => clearTimeout(cronometroRef.current);
  }, []);

  // Esse efeito faz a tecla ESC fechar o modal
  useEffect(() => {
    function aoApertarTecla(evento) {
      if (evento.key === "Escape") onFechar();
    }
    window.addEventListener("keydown", aoApertarTecla);
    return () => window.removeEventListener("keydown", aoApertarTecla);
  }, [onFechar]);

  // true somente quando TODOS os campos têm algo escrito/selecionado
  const formularioCompleto =
    usuario.trim() !== "" &&
    jogo !== "" &&
    plataforma !== "" &&
    categoria !== "" &&
    link.trim() !== "";

  /*
    Função: irParaConfirmacao
    O que faz: roda ao clicar em "Enviar" (ou apertar Enter).
    Se tudo estiver preenchido, mostra a pergunta "Tem certeza?".
  */
  function irParaConfirmacao(evento) {
    evento.preventDefault();
    if (!formularioCompleto) return;
    setErro("");
    setEtapa("confirmacao");
  }

  /*
    Função: confirmarEnvio
    O que faz: roda ao clicar em "Confirmar".
    Confere se o link é do YouTube. Se não for, volta ao formulário com
    uma mensagem de erro. Se for, mostra o feedback positivo e
    fecha o modal depois de 5 segundos.
  */
  function confirmarEnvio() {
    if (!validarLinkYoutube(link)) {
      setErro(
        "O link precisa ser de um vídeo do YouTube. Exemplo: https://youtu.be/abcdefghijk",
      );
      setEtapa("formulario");
      return;
    }

    setEtapa("sucesso");
    // Depois de 5000 milissegundos (5 segundos), fecha o modal
    cronometroRef.current = setTimeout(onFechar, 5000);
  }

  /*
    Função: voltarParaFormulario
    O que faz: na pergunta "Tem certeza?", o botão Voltar
    leva de volta ao formulário sem perder o que foi digitado.
  */
  function voltarParaFormulario() {
    setEtapa("formulario");
  }

  return (
    // Fundo escuro que cobre a tela toda. Clicar fora da caixa fecha o modal
    <div
      onClick={onFechar}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    >
      {/* Caixa branca no meio. O stopPropagation evita fechar ao clicar dentro dela */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-gray-200 rounded-lg shadow-lg p-8 w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        {/* Botão X para fechar */}
        <button
          type="button"
          onClick={onFechar}
          aria-label="Fechar"
          className="absolute top-3 right-4 text-gray-700 hover:text-black text-xl font-bold cursor-pointer"
        >
          ✕
        </button>

        {/* ETAPA 1: FORMULÁRIO */}
        {etapa === "formulario" && (
          <>
            <h2 className="text-black text-2xl font-bold mb-6 text-center">
              Envie sua run
            </h2>

            {/* O <form> faz a tecla Enter funcionar, igual no login */}
            <form onSubmit={irParaConfirmacao} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="run-usuario"
                  className="text-gray-800 text-sm font-bold"
                >
                  Usuário
                </label>
                <input
                  id="run-usuario"
                  type="text"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  placeholder="Seu nome de usuário"
                  className={estiloCampo}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="run-jogo"
                  className="text-gray-800 text-sm font-bold"
                >
                  Jogo
                </label>
                <select
                  id="run-jogo"
                  value={jogo}
                  onChange={(e) => setJogo(e.target.value)}
                  className={estiloCampo}
                >
                  <option value="">Selecione o jogo</option>
                  {jogos.map((j) => (
                    <option key={j.id} value={j.nome}>
                      {j.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="run-plataforma"
                  className="text-gray-800 text-sm font-bold"
                >
                  Plataforma
                </label>
                <select
                  id="run-plataforma"
                  value={plataforma}
                  onChange={(e) => setPlataforma(e.target.value)}
                  className={estiloCampo}
                >
                  <option value="">Selecione a plataforma</option>
                  {plataformas.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="run-categoria"
                  className="text-gray-800 text-sm font-bold"
                >
                  Categoria
                </label>
                <select
                  id="run-categoria"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className={estiloCampo}
                >
                  <option value="">Selecione a categoria</option>
                  {categorias.map((c) => (
                    <option key={c.nome} value={c.nome}>
                      {c.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="run-link"
                  className="text-gray-800 text-sm font-bold"
                >
                  Link do vídeo (YouTube)
                </label>
                <input
                  id="run-link"
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://youtu.be/..."
                  className={estiloCampo}
                />
              </div>

              {/* Mensagem de erro (vermelho) */}
              {erro && (
                <p className="text-red-600 text-sm font-semibold text-center">
                  {erro}
                </p>
              )}

              {/* O botão só fica habilitado quando TODOS os campos estão preenchidos */}
              <button
                type="submit"
                disabled={!formularioCompleto}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl font-bold text-sm transition-all active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 disabled:hover:bg-blue-600"
              >
                Enviar
              </button>
            </form>
          </>
        )}

        {/* ETAPA 2: CONFIRMAÇÃO */}
        {etapa === "confirmacao" && (
          <div className="flex flex-col gap-4 text-center">
            <h2 className="text-black text-2xl font-bold">Tem certeza?</h2>
            <p className="text-gray-800 text-sm">
              Deseja mesmo enviar esta run?
            </p>

            {/* Resumo do que foi preenchido */}
            <div className="bg-white rounded-2xl p-4 text-left text-sm text-gray-800 flex flex-col gap-1">
              <p>
                <strong>Usuário:</strong> {usuario}
              </p>
              <p>
                <strong>Jogo:</strong> {jogo}
              </p>
              <p>
                <strong>Plataforma:</strong> {plataforma}
              </p>
              <p>
                <strong>Categoria:</strong> {categoria}
              </p>
              <p className="break-all">
                <strong>Vídeo:</strong> {link}
              </p>
            </div>

            <div className="flex gap-2 justify-center">
              <button
                type="button"
                onClick={voltarParaFormulario}
                className="bg-gray-400 hover:bg-gray-500 text-black px-4 py-2 rounded-2xl font-bold text-sm transition-all active:scale-95 cursor-pointer"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={confirmarEnvio}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl font-bold text-sm transition-all active:scale-95 cursor-pointer"
              >
                Confirmar
              </button>
            </div>
          </div>
        )}

        {/* ETAPA 3: SUCESSO */}
        {etapa === "sucesso" && (
          <div className="flex flex-col gap-3 text-center py-4">
            <p className="text-5xl">✅</p>
            <h2 className="text-green-700 text-2xl font-bold">
              Run enviada com sucesso!
            </h2>
            <p className="text-gray-700 text-sm">
              Obrigado por participar! Esta janela fecha em 5 segundos.
            </p>
            <p className="text-gray-500 text-xs">
              (Envio demonstrativo: nenhum dado é salvo em servidor.)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
