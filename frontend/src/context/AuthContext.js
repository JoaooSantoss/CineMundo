"use client";

import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const usuarioSalvo = localStorage.getItem("usuario");

      if (usuarioSalvo) {
        setUsuarioLogado(JSON.parse(usuarioSalvo));
      }
    } catch (error) {
      console.error("Erro ao ler localStorage:", error);
    }

    setLoading(false);
  }, []);

  const login = (dadosDoUsuario) => {
    setUsuarioLogado(dadosDoUsuario);

    try {
      localStorage.setItem("usuario", JSON.stringify(dadosDoUsuario));
    } catch (error) {
      console.error("Erro ao salvar no localStorage:", error);
    }
  };

  const logout = () => {
    setUsuarioLogado(null);

    try {
      localStorage.removeItem("usuario");
    } catch (error) {
      console.error("Erro ao remover do localStorage:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ usuarioLogado, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  }

  return context;
};
