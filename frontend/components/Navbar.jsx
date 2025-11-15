export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="logo.png"></img>
      </div>
       {/* <div className="navbar-nome">CineMundo</div>  */}
      <div className="navbar-links">
        <a href="/">Home</a>
        <a href="#">Programação</a>
        <a href="#">Parcerias</a>
        <a href="/pedidos">Pedidos</a>
        <a href="/cartaz">Cartaz</a>
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