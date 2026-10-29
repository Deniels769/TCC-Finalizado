import React, { useState } from "react";
// useNavigate = trocar de página pelo código
import { useNavigate } from "react-router-dom";
// NOVO: navbar e footer compartilhados
import Navbar from "./Navbar";
import Footer from "./Footer";
// ALTERADO: validarEmail agora vem do arquivo utils/validacoes.js
import { validarEmail } from "../utils/validacoes";

// Nomes das "gavetas" do localStorage (a memória do navegador)
const CHAVE_USUARIOS = "usuarios"; // lista de todas as contas criadas
const CHAVE_USUARIO_LOGADO = "usuarioLogado"; // quem está logado agora

/*
  Função: buscarUsuarios
  O que faz: lê no navegador a lista de contas criadas.
  Se ainda não existir nenhuma (ou der erro), devolve uma lista vazia.
*/
function buscarUsuarios() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_USUARIOS)) || [];
  } catch {
    return [];
  }
}

// Mantive o nome do componente com letra maiúscula (Login), exigência do React
export default function Login() {
  // Ferramenta que permite mandar o usuário para outra página
  const navigate = useNavigate();

  // Estados: valores que, quando mudam, atualizam a tela
  const [modoCadastro, setModoCadastro] = useState(false); // false = tela de login | true = criar conta
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState(""); // mensagem vermelha
  const [sucesso, setSucesso] = useState(""); // mensagem verde

  /*
    Função: alternarModo
    O que faz: troca entre "Entrar" e "Criar conta" e limpa as mensagens e campos.
  */
  function alternarModo() {
    setModoCadastro(!modoCadastro);
    setErro("");
    setSucesso("");
    setNome("");
    setSenha("");
    setConfirmarSenha("");
  }

  /*
    Função: fazerLogin
    O que faz: confere e-mail e senha digitados com as contas salvas no navegador.
    Se estiver tudo certo, guarda quem entrou e volta para a página inicial.
    É chamada ao clicar em "Entrar" OU ao apertar Enter (veja o <form> abaixo).
  */
  function fazerLogin(evento) {
    evento.preventDefault(); // impede a página de recarregar
    setErro("");
    setSucesso("");

    // 1. O formato do e-mail está correto?
    if (!validarEmail(email)) {
      setErro("Digite um e-mail válido. Exemplo: nome@email.com");
      return;
    }

    // 2. A senha foi preenchida?
    if (senha === "") {
      setErro("Digite a sua senha.");
      return;
    }

    // 3. Existe uma conta com esse e-mail e essa senha?
    const usuarios = buscarUsuarios();
    const usuarioEncontrado = usuarios.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha,
    );

    if (!usuarioEncontrado) {
      setErro("E-mail ou senha incorretos.");
      return;
    }

    // 4. Deu certo: salva quem está logado (sem guardar a senha)
    localStorage.setItem(
      CHAVE_USUARIO_LOGADO,
      JSON.stringify({
        nome: usuarioEncontrado.nome,
        email: usuarioEncontrado.email,
      }),
    );

    // 5. Volta para a página inicial
    navigate("/");
  }

  /*
    Função: criarConta
    O que faz: valida os dados do cadastro e salva a nova conta no navegador
    (localStorage). Depois volta para a tela de login com o e-mail já preenchido.
    Também funciona com a tecla Enter.
    Atenção: é só para demonstração. Sem back-end, a conta existe apenas
    neste navegador e a senha fica salva sem proteção.
  */
  function criarConta(evento) {
    evento.preventDefault();
    setErro("");
    setSucesso("");

    // 1. Nome do usuário
    if (nome.trim().length < 3) {
      setErro("O nome de usuário precisa ter pelo menos 3 letras.");
      return;
    }

    // 2. E-mail
    if (!validarEmail(email)) {
      setErro("Digite um e-mail válido. Exemplo: nome@email.com");
      return;
    }

    // 3. Senha
    if (senha.length < 6) {
      setErro("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    // 4. As duas senhas são iguais?
    if (senha !== confirmarSenha) {
      setErro("As senhas não são iguais.");
      return;
    }

    // 5. Já existe uma conta com esse e-mail?
    const usuarios = buscarUsuarios();
    const emailJaExiste = usuarios.some(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
    if (emailJaExiste) {
      setErro("Já existe uma conta com esse e-mail.");
      return;
    }

    // 6. Tudo certo: adiciona a nova conta na lista e salva no navegador
    const novoUsuario = { nome: nome.trim(), email, senha };
    localStorage.setItem(
      CHAVE_USUARIOS,
      JSON.stringify([...usuarios, novoUsuario]),
    );

    // 7. Volta para a tela de login mostrando a mensagem de sucesso
    setModoCadastro(false);
    setNome("");
    setSenha("");
    setConfirmarSenha("");
    setSucesso("Conta criada com sucesso! Agora é só entrar.");
  }

  // Classe repetida nos campos de texto (para não escrever tudo várias vezes)
  const estiloCampo =
    "w-full px-4 py-2 rounded-2xl bg-white text-black text-sm border border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400";

  return (
    // Fundo da página: bg-gray-600 (ALTERADO: "flex flex-col" para o footer ficar no final)
    <div className="w-full bg-gray-600 min-h-screen flex flex-col">
      {/* 1. NAVBAR (ALTERADO: agora é o componente Navbar, com a cor bg-green-400) */}
      <Navbar />

      {/* 2. CAIXA DE LOGIN / CRIAR CONTA */}
      <main className="flex flex-1 justify-center items-start p-6">
        <div className="bg-gray-200 shadow-lg rounded-lg p-8 w-full max-w-md">
          <h1 className="text-black text-2xl font-bold mb-6 text-center">
            {modoCadastro ? "Criar conta" : "Entrar"}
          </h1>

          {/*
            O <form> é o que faz a tecla Enter funcionar: apertar Enter em qualquer
            campo "envia" o formulário, e o onSubmit chama a função certa
            (criarConta ou fazerLogin), igual ao clique no botão.
          */}
          <form
            onSubmit={modoCadastro ? criarConta : fazerLogin}
            className="flex flex-col gap-4"
          >
            {/* Nome de usuário: aparece só na criação de conta */}
            {modoCadastro && (
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="nome"
                  className="text-gray-800 text-sm font-bold"
                >
                  Nome de usuário
                </label>
                <input
                  id="nome"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex: zZoink"
                  className={estiloCampo}
                />
              </div>
            )}

            {/* E-mail */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-gray-800 text-sm font-bold"
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@email.com"
                className={estiloCampo}
              />
            </div>

            {/* Senha */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="senha"
                className="text-gray-800 text-sm font-bold"
              >
                Senha
              </label>
              <input
                id="senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Sua senha"
                className={estiloCampo}
              />
            </div>

            {/* Confirmar senha: aparece só na criação de conta */}
            {modoCadastro && (
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="confirmarSenha"
                  className="text-gray-800 text-sm font-bold"
                >
                  Confirmar senha
                </label>
                <input
                  id="confirmarSenha"
                  type="password"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  placeholder="Repita a senha"
                  className={estiloCampo}
                />
              </div>
            )}

            {/* Mensagens de erro (vermelho) e de sucesso (verde) */}
            {erro && (
              <p className="text-red-600 text-sm font-semibold text-center">
                {erro}
              </p>
            )}
            {sucesso && (
              <p className="text-green-700 text-sm font-semibold text-center">
                {sucesso}
              </p>
            )}

            {/* Botão principal: type="submit" dispara o onSubmit do formulário */}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl font-bold text-sm transition-all active:scale-95 cursor-pointer"
            >
              {modoCadastro ? "Criar conta" : "Entrar"}
            </button>
          </form>

          {/* Texto abaixo da caixa da senha, que troca entre login e cadastro */}
          <p className="text-gray-700 text-sm text-center mt-6">
            {modoCadastro ? "Já tem uma conta? " : "Você é novo aqui? "}
            <button
              type="button"
              onClick={alternarModo}
              className="text-blue-700 hover:underline font-bold cursor-pointer"
            >
              {modoCadastro ? "Entre agora!" : "Crie uma nova conta!"}
            </button>
          </p>
        </div>
      </main>

      {/* NOVO: rodapé com a assinatura do criador */}
      <Footer />
    </div>
  );
}
