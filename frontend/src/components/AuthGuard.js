"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext"; // Ajuste o caminho se necessário

export default function AuthGuard({ children }) {
    const { usuarioLogado, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Se terminou de carregar (loading false) E não tem usuário logado
        if (!loading && !usuarioLogado) {
            router.push("/login"); // Chuta pro login
        }
    }, [usuarioLogado, loading, router]);

    // 1. Enquanto carrega: Mostra o Spinner (para não dar tela branca)
    if (loading) {
        return (
            <div style={{ 
                height: '100vh', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                backgroundColor: '#2b0000' // Cor do seu fundo
            }}>
                <div className="spinner"></div> {/* Aquele CSS que criamos */}
            </div>
        );
    }

    // 2. Se não tem usuário: Retorna null para não piscar o conteúdo protegido antes de redirecionar
    if (!usuarioLogado) {
        return null;
    }

    // 3. Se tem usuário: Renderiza a página protegida (o children)
    return (
        <>
            {children}
        </>
    );
}