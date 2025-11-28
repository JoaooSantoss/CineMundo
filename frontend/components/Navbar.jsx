import '../components/CSS/Navbar.css'
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="logo.png"></img>
      </div>
       {/* <div className="navbar-nome">CineMundo</div>  */}
      <div className="navbar-links">
        <a href="/">HOME</a>
        <a href="/pedidos">INGRESSOS</a>
        <a href="/cartaz">FILMES</a>
      </div>
      <div className="navbar-actions">
        <select>
          <option>Campinas</option>
          <option>São Paulo</option>
        </select>
        <button>Entrar</button>
      </div>
    </nav>
  );
}