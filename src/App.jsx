import { Routes, Route } from "react-router-dom";
import Principal from "./components/Speedrun";
import Login from "./components/login";
import Jogos from "./components/Jogos";
import Desafios from "./components/Desafios";
import Suporte from "./components/Suporte";

// O App só decide qual página aparece em cada endereço do site
export default function App() {
  return (
    <Routes>
      {/* Endereço "/" = página inicial */}
      <Route path="/" element={<Principal />} />
      {/* Endereço "/login" = página de login e criação de conta */}
      <Route path="/login" element={<Login />} />
      {/* NOVO: "/jogos" = biblioteca com as capas dos jogos */}
      <Route path="/jogos" element={<Jogos />} />
      {/* NOVO: "/desafios" = categorias de corrida (funcionam como filtro) */}
      <Route path="/desafios" element={<Desafios />} />
      {/* NOVO: "/suporte" = formulário de contato com o suporte */}
      <Route path="/suporte" element={<Suporte />} />
    </Routes>
  );
}
