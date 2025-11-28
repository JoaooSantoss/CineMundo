"use client";

import { useEffect, useState } from "react";
import "./pedidos.css";
import Navbar from "../../components/Navbar";

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const clienteId = 2;

  useEffect(() => {
    async function carregarPedidos() {
      try {
        const resposta = await fetch(`http://localhost:3001/Pedidos/${clienteId}`);
        const dados = await resposta.json();
        setPedidos(dados);
      } catch (erro) {
        console.error("Erro ao buscar pedidos:", erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarPedidos();
  }, []);

  return (
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

          {pedidos.map((p, index) => (
            <div key={index}>

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
                    <td>R$ {p.valor_ingresso}</td>
                    <td>{p.quantidade}</td>
                    <td>R$ {p.total}</td>
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
  );
}
