/*
  Lista de jogos usada na biblioteca, nos desafios e no formulário da run.
  Cada jogo tem um "steamId": o número do jogo na Steam, usado para montar
  o endereço da imagem da capa.
*/
export const jogos = [
  { id: 1, nome: "Half-Life", steamId: 70 },
  { id: 2, nome: "Half-Life 2", steamId: 220 },
  { id: 3, nome: "Portal", steamId: 400 },
  { id: 4, nome: "Portal 2", steamId: 620 },
  { id: 5, nome: "Left 4 Dead 2", steamId: 550 },
  { id: 6, nome: "Celeste", steamId: 504230 },
  { id: 7, nome: "Hollow Knight", steamId: 367520 },
  { id: 8, nome: "Super Meat Boy", steamId: 40800 },
  { id: 9, nome: "Cuphead", steamId: 268910 },
  { id: 10, nome: "Hades", steamId: 1145360 },
  { id: 11, nome: "Terraria", steamId: 105600 },
  { id: 12, nome: "Elden Ring", steamId: 1245620 },
  { id: 13, nome: "Sekiro: Shadows Die Twice", steamId: 814380 },
  { id: 14, nome: "Dark Souls III", steamId: 374320 },
  { id: 15, nome: "DOOM Eternal", steamId: 782330 },
  { id: 16, nome: "ULTRAKILL", steamId: 1229490 },
  { id: 17, nome: "Undertale", steamId: 391540 },
  { id: 18, nome: "Stardew Valley", steamId: 413150 },
  { id: 19, nome: "Getting Over It", steamId: 240720 },
  { id: 20, nome: "Hotline Miami", steamId: 219150 },
  { id: 21, nome: "Deltarune", steamId: 1671210 },
];

/*
  Função: capaDoJogo
  O que faz: recebe o número do jogo na Steam e devolve o endereço
  da imagem da capa (formato vertical, tipo capa de caixinha).
*/
export function capaDoJogo(steamId) {
  return `https://cdn.akamai.steamstatic.com/steam/apps/${steamId}/library_600x900.jpg`;
}

/*
  Função: trocarParaCapaReserva
  O que faz: se a capa vertical não carregar (onError), troca por uma imagem
  alternativa (horizontal) do mesmo jogo. O "onerror = null" evita um
  loop infinito caso a imagem reserva também falhe.
*/
export function trocarParaCapaReserva(evento, steamId) {
  evento.currentTarget.onerror = null;
  evento.currentTarget.src = `https://cdn.akamai.steamstatic.com/steam/apps/${steamId}/header.jpg`;
}

/*
  Função: buscarJogo
  O que faz: procura um jogo na lista pelo id e devolve os dados dele.
*/
export function buscarJogo(id) {
  return jogos.find((jogo) => jogo.id === id);
}
