import Navbar from "../../components/Navbar";
import "./pedidos.css";

export default function Pedidos() {
  const pedidos = [
    {
      numero: 12345,
      itens: [
        {
          filme: "MINECRAFT",
          data: "30/05/2025",
          hora: "20:00",
          valorIngresso: "R$ 30,00",
          quantidade: 2,
          total: "R$ 60,00",
        },
      ],
    },
    {
      numero: 12346,
      itens: [
        {
          filme: "THE-CHOSEN",
          data: "02/06/2025",
          hora: "18:00",
          valorIngresso: "R$ 28,00",
          quantidade: 3,
          total: "R$ 84,00",
        },
      ],
    },
    {
      numero: 12347,
      itens: [
        {
          filme: "O MACACO",
          data: "10/06/2025",
          hora: "18:45",
          valorIngresso: "R$ 35,00",
          quantidade: 2,
          total: "R$ 70,00",
        },
      ],
    },
  ];

  return (
    <main>
      <Navbar />

      <div className="pedidos-container">
        <h1 className="pedidos-title">🔍 Consulta de Pedidos</h1>

        <p className="usuario">👤 Olá João da Silva</p>

        {pedidos.map((pedido) => (
          <div key={pedido.numero} className="pedido-box">
            <h2 className="pedido-numero">Pedido nº {pedido.numero}</h2>

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
                {pedido.itens.map((item, index) => (
                  <tr key={index}>
                    <td>{item.filme}</td>
                    <td>{item.data}</td>
                    <td>{item.hora}</td>
                    <td>{item.valorIngresso}</td>
                    <td>{item.quantidade}</td>
                    <td>{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </main>
  );
}
