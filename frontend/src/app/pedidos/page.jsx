"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AuthGuard from "../../components/AuthGuard";
import Navbar from "../../components/Navbar";
import './pedidos.css';

export default function MeusPedidos() {
    const { usuarioLogado } = useAuth();
    const [pedidos, setPedidos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        // Só busca se tiver usuário (o AuthGuard já garante, mas é bom prevenir)
        if (usuarioLogado) {
            buscarPedidos();
        }
    }, [usuarioLogado]);

    const buscarPedidos = async () => {
        try {
            const response = await fetch(`http://localhost:3001/pedidos/${usuarioLogado.id}`);
            const data = await response.json();
            setPedidos(data);
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
        } finally {
            setCarregando(false);
        }
    };

  return (
        <AuthGuard>
            <main>
                <Navbar />
                <div className="pedidos-container">

                    <h1>🔍 Consulta de Pedidos</h1>

                    {carregando && <p className="loading">Carregando pedidos...</p>}

                    {!carregando && pedidos.length === 0 && (
                        <p className="sem-pedidos">Nenhum pedido encontrado.</p>
                    )}

                    {pedidos.length > 0 && (
                        <div className="lista-pedidos">

                            {pedidos.map((p) => (
                                /* Use o ID ou Numero como Key */
                                <div key={p.numero}> 

                                    {/* Título do pedido */}
                                    <div className="titulo-pedido">
                                        Pedido nº {p.numero}
                                    </div>

                                    {/* Tabela */}
                                    <table className="tabela-pedido">
                                        <thead>
                                            <tr>
                                                <th>Filme</th>
                                                <th>Data da Sessão</th>
                                                <th>Hora</th>
                                                <th>Valor do Ingresso</th>
                                                <th>Quantidade</th>
                                                <th>Valor Total</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr>
                                                <td>{p.filme}</td>
                                                <td>{p.data_sessao}</td>
                                                <td>{p.horario}</td>
                                                
                                                {/* CORREÇÃO AQUI: p.preco em vez de p.valor_ingresso */}
                                                <td>R$ {Number(p.preco).toFixed(2)}</td>
                                                
                                                <td>{p.quantidade}</td>
                                                
                                                {/* Formatação para 2 casas decimais */}
                                                <td>R$ {Number(p.total).toFixed(2)}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    {/* Separador vinho */}
                                    <div className="pedido-separador"></div>

                                </div>
                            ))}

                        </div>
                    )}
                </div>
            </main>
        </AuthGuard>
    );
}
