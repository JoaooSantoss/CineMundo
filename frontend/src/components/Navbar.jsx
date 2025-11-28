"use client";

import "./CSS/Navbar.css";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { usuarioLogado, logout, loading } = useAuth();

  return (
    <nav className="navbar">
      {/* LOGO */}
      <div className="navbar-logo">
        <img src="/logo.png" alt="Logo" />
      </div>

      {/* LINKS */}
      <div className="navbar-links">
        <Link href="/">HOME</Link>
        <Link href="/pedidos">MEUS INGRESSOS</Link>
        <Link href="/cartaz">FILMES</Link>
        <Link href="/comprar-ingresso">COMPRAR INGRESSO</Link>
      </div>

      {/* AÇÕES (CIDADE + LOGIN/LOGOUT) */}
      <div className="navbar-actions">
        <select>
          <option>Campinas</option>
          <option>São Paulo</option>
        </select>

        {/* Loading */}
        {loading ? (
          <div className="spinner" aria-label="Carregando..." />

        ) : usuarioLogado ? (
          // Usuário logado
          <>
            <span className="navbar-usuario">
              Olá, {usuarioLogado.nome}
            </span>

            <button onClick={logout}>Sair</button>
          </>
        ) : (
          // Usuário deslogado
          <Link href="/login">
            <button>Entrar</button>
          </Link>
        )}
      </div>
    </nav>
  );
}
