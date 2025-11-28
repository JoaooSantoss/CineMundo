"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "./cartaz.css";

export default function Cartaz() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function carregarFilmes() {
      try {
        const res = await fetch("http://localhost:3001/Filmes"); // <-- API CORRETA (com F maiúsculo?)

        if (!res.ok) {
          throw new Error("Erro na resposta da API");
        }

        const data = await res.json();

        const filmesFormatados = data.map(f => ({
          id: f.id,
          title: f.titulo,
          duration: f.duracao + " min",
          genre: f.genero_nome,
          description: f.sinopse,
          image: f.poster
        }));

        setMovies(filmesFormatados);

      } catch (err) {
        console.error("Erro ao carregar filmes:", err);
      }
    }

    carregarFilmes();
  }, []);

  return (
    <main>
      <Navbar />

      <div className="top-buttons">
        <button className="btn-comprar">🛒 Comprar Ingressos</button>
      </div>

      <div className="container">
        <h1 className="titulo">🎬 Vitrine de Filmes</h1>

        <div className="grid">
          {movies.map((movie) => (
            <div key={movie.id} className="filme-card">
              <img src={movie.image} alt={movie.title} />
              <div className="info">
                <h3>{movie.title}</h3>
                <p>🕒 Duração: {movie.duration}</p>
                <p>🎞️ Gênero: {movie.genre}</p>
                <p>Descrição: {movie.description}</p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </main>
  );
}
