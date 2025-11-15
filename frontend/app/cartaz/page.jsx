import Navbar from "../../components/Navbar";
import "./cartaz.css";

export default function Cartaz() {
  const movies = [
    {
      id: 1,
      title: "CAPITÃO AMÉRICA 1",
      duration: "2h 18min",
      genre: "Ação / Aventura / Super-herói",
      description:
        "Sam Wilson assume o escudo de luta para unir uma nação dividida enquanto enfrenta ameaças internas e conspirações globais.",
      image: "/movies/capitao.jpg",
    },
    {
      id: 2,
      title: "DESCONHECIDO",
      duration: "1h 50min",
      genre: "Suspense / Mistério",
      description:
        "Um grupo acorda preso em uma floresta sombria sem memória de como chegou lá. Cada pista revela um segredo mais obscuro.",
      image: "/movies/desconhecidos.jpg",
    },
    {
      id: 3,
      title: "FORÇA BRUTA 3",
      duration: "2h 05min",
      genre: "Ação / Policial",
      description:
        "O detetive Zhang retorna para uma missão internacional, enfrentando um cartel poderoso e fantasmas do passado.",
      image: "/movies/forca.jpg",
    },
    {
      id: 4,
      title: "MINECRAFT 4",
      duration: "1h 38min",
      genre: "Comédia / Aventura / Família",
      description:
        "Um grupo de jogadores entra no universo de blocos para salvar o Reino de Bedrock de um bug que ameaça tudo.",
      image: "/movies/minecraft.jpg",
    },
    {
      id: 5,
      title: "THE CHOSEN 5",
      duration: "2h 12min",
      genre: "Drama / Religioso / Histórico",
      description:
        "A série sobre a vida de Jesus continua, explorando os milagres, ensinamentos e provações que moldaram seus seguidores.",
      image: "/movies/chosen.jpg",
    },
     {
      id: 6,
      title: "PREMONIÇAO 6",
      duration: "1h 38min",
      genre: "Terror / Suspense",
      description:
        "é um filme de terror sobre Stefani, uma estudante universitária que é atormentada por pesadelos recorrentes onde vê a morte de sua família",
      image: "/movies/PREMONICAO6.jpg",
    },
    {
      id: 7,
      title: "O MACACO",
      duration: "2h 12min",
      genre: "Terror / Suspense",
      description:
        "dois irmãos gêmeos, Hal e Bill, que encontram um antigo macaco de brinquedo amaldiçoado no sótão de casa. Quando o brinquedo começa a causar mortes terríveis, os irmãos tentam se livrar dele e se distanciam. Anos depois, as mortes recomeçam, forçando-os a se reunir para tentar destruir a criatura de uma vez por todas.",
      image: "/movies/oMacaco.jpg",
    },
     {
      id: 8,
      title: "COMO TREINAR SEU DRAGAO",
      duration: "1h 38min",
      genre: "Comédia / Aventura / Família",
      description:
        "é uma história sobre Soluço, um jovem viking que não se encaixa na tradição de caçar dragões, mas se torna amigo de um dragão Fúria da Noite ferido chamado Banguela.",
      image: "/movies/como-treinar-seu-dragao.jpg",
    },
    {
      id: 9,
      title: "THUNDERBOLTS",
      duration: "2h 12min",
      genre: "Drama / Religioso / Histórico",
      description:
        "Thunderbolts refere-se tanto a uma equipe fictícia de super-heróis/anti-heróis da Marvel Comics quanto a um filme de 2025 baseado nesta equipe.",
      image: "/movies/thunderbolts.jpeg",
    },
     {
      id: 10,
      title: "VINGADORES DOOMSDAY",
      duration: "1h 38min",
      genre: "Comédia / Aventura / Família",
      description:
        "o Doutor Destino, um mestre da ciência e magia, causará uma crise em cascata por todo o multiverso, acelerando as incursões entre universos. Seu objetivo é usar o poder resultante da destruição multiversal para se tornar um líder supremo em um novo mundo que ele criara.",
      image: "/movies/vingadoresDoomsDay.jpg",
    },
  ];

  return (
    <main>
      <Navbar />
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
