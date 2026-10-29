/*
  Função: validarEmail
  O que faz: confere se o texto parece um e-mail (tem algo + @ + algo + . + algo).
  Importante: sem back-end NÃO dá para saber se o e-mail realmente existe,
  então só verificamos se o formato está correto.
  (Esta função estava dentro do login.jsx. Foi movida para cá para
  ser usada também na página de Suporte.)
*/
export function validarEmail(email) {
  const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return formatoEmail.test(email);
}

/*
  Função: validarLinkYoutube
  O que faz: confere se o texto é um link de vídeo do YouTube.
  Aceita os formatos: youtube.com/watch?v=..., youtu.be/... e youtube.com/shorts/...
*/
export function validarLinkYoutube(link) {
  const formatoYoutube =
    /^(https?:\/\/)?(www\.|m\.)?(youtube\.com\/(watch\?v=|shorts\/|embed\/)|youtu\.be\/)[\w-]{11}/;
  return formatoYoutube.test(link.trim());
}
