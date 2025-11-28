"use client";

import { useState, useEffect } from "react";
import "./Ingresso.css";

export default function Page() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/Filmes")
      .then((res) => res.json())
      .then((data) => setFilmes(data))
      .catch((err) => console.error("Erro ao carregar filmes:", err));
  }, []);

  return (
    <div className="ingresso-container">
      <h1>Comprar Ingresso</h1>

      <select>
        <option value="">Selecione um filme</option>
        {filmes.map((f) => (
          <option key={f.id} value={f.id}>
            {f.titulo}
          </option>
        ))}
      </select>
    </div>
  );
}
