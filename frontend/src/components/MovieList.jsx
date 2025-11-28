export default function MovieList() {
  const movies = [
    { title: "Minecraft", image: "/movies/minecraft.jpg" },
    { title: "The Chosen", image: "/movies/chosen.jpg" },
    { title: "Capitão América", image: "/movies/capitao.jpg" },
    { title: "Força Bruta", image: "/movies/forca.jpg" },
    { title: "Desconhecidos", image: "/movies/desconhecidos.jpg" },
  ];

  return (
    <section className="movies-section">
      <h2>Em Exibição</h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.title} className="movie-card">
            <img src={movie.image} alt={movie.title} />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}