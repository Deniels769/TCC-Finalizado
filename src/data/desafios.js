/*
  Categorias de corrida (inspiradas no speedrun.com).
  "corridas" é só um número de exemplo para a página inicial (demonstrativo).
*/
export const categorias = [
  {
    nome: "Any%",
    icone: "⚡",
    descricao:
      "Terminar o jogo o mais rápido possível, por qualquer meio permitido.",
    corridas: 18420,
  },
  {
    nome: "100%",
    icone: "💯",
    descricao: "Completar tudo no jogo: fases, itens e segredos.",
    corridas: 9310,
  },
  {
    nome: "Glitchless",
    icone: "🛡️",
    descricao: "Terminar o jogo rápido, mas sem usar bugs ou falhas.",
    corridas: 12760,
  },
  {
    nome: "Glitched",
    icone: "👾",
    descricao: "Bugs e falhas são permitidos para atalhos e tempos absurdos.",
    corridas: 7845,
  },
];

/*
  Runs de exemplo. O campo "tempo" está em SEGUNDOS.
  Os tempos foram escolhidos para fazer sentido: jogos curtos ou com glitches
  têm tempos pequenos, e 100% de jogos grandes têm tempos longos.
  "jogoId" liga a run a um jogo da lista em jogos.js.
*/
export const runs = [
  // Any%
  {
    id: 1,
    jogoId: 6,
    categoria: "Any%",
    jogador: "Brisa_BR",
    tempo: 1650,
    nacionalidade: "🇧🇷",
  },
  {
    id: 2,
    jogoId: 7,
    categoria: "Any%",
    jogador: "KnightRun",
    tempo: 3960,
    nacionalidade: "🇺🇸",
  },
  {
    id: 3,
    jogoId: 2,
    categoria: "Any%",
    jogador: "LambdaRush",
    tempo: 4080,
    nacionalidade: "🇩🇪",
  },
  {
    id: 4,
    jogoId: 9,
    categoria: "Any%",
    jogador: "Tazza",
    tempo: 1740,
    nacionalidade: "🇯🇵",
  },
  {
    id: 5,
    jogoId: 3,
    categoria: "Any%",
    jogador: "ApertureAna",
    tempo: 420,
    nacionalidade: "🇪🇸",
  },
  // 100%
  {
    id: 6,
    jogoId: 6,
    categoria: "100%",
    jogador: "Strawb3rry",
    tempo: 6900,
    nacionalidade: "🇨🇦",
  },
  {
    id: 7,
    jogoId: 7,
    categoria: "100%",
    jogador: "VoidWalker",
    tempo: 12300,
    nacionalidade: "🇬🇧",
  },
  {
    id: 8,
    jogoId: 8,
    categoria: "100%",
    jogador: "MeatBoyBR",
    tempo: 7800,
    nacionalidade: "🇧🇷",
  },
  {
    id: 9,
    jogoId: 9,
    categoria: "100%",
    jogador: "Tazza",
    tempo: 5400,
    nacionalidade: "🇯🇵",
  },
  // Glitchless
  {
    id: 10,
    jogoId: 12,
    categoria: "Glitchless",
    jogador: "TarnishedLeo",
    tempo: 4560,
    nacionalidade: "🇧🇷",
  },
  {
    id: 11,
    jogoId: 3,
    categoria: "Glitchless",
    jogador: "ChellFan",
    tempo: 840,
    nacionalidade: "🇺🇸",
  },
  {
    id: 12,
    jogoId: 10,
    categoria: "Glitchless",
    jogador: "StyxSprint",
    tempo: 900,
    nacionalidade: "🇫🇷",
  },
  {
    id: 13,
    jogoId: 14,
    categoria: "Glitchless",
    jogador: "AshenOne",
    tempo: 4380,
    nacionalidade: "🇨🇦",
  },
  // Glitched
  {
    id: 14,
    jogoId: 12,
    categoria: "Glitched",
    jogador: "SkipGod",
    tempo: 330,
    nacionalidade: "🇯🇵",
  },
  {
    id: 15,
    jogoId: 13,
    categoria: "Glitched",
    jogador: "WolfShinobi",
    tempo: 1290,
    nacionalidade: "🇫🇷",
  },
  {
    id: 16,
    jogoId: 1,
    categoria: "Glitched",
    jogador: "GordonFree",
    tempo: 1740,
    nacionalidade: "🇩🇪",
  },
  {
    id: 17,
    jogoId: 19,
    categoria: "Glitched",
    jogador: "FrogClimber",
    tempo: 75,
    nacionalidade: "🇧🇷",
  },
];

/*
  Função: formatarTempo
  O que faz: transforma segundos em um texto fácil de ler.
  Exemplos: 75 -> "1m 15s" | 4560 -> "1h 16m 00s"
*/
export function formatarTempo(totalSegundos) {
  const horas = Math.floor(totalSegundos / 3600);
  const minutos = Math.floor((totalSegundos % 3600) / 60);
  const segundos = totalSegundos % 60;
  const segundosComZero = String(segundos).padStart(2, "0");

  if (horas > 0) {
    return `${horas}h ${String(minutos).padStart(2, "0")}m ${segundosComZero}s`;
  }
  return `${minutos}m ${segundosComZero}s`;
}
