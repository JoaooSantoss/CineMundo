import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import MovieList from "../components/MovieList";
import "./styles.css";

export default function Page() {
  return (
    <main>
      <Navbar />
      <Banner />
      <MovieList />
    </main>
  );
}