"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "./styles.module.css";
import NavBar from "../../components/Navbar";

export default function ComprarIngresso() {
  const { usuarioLogado } = useAuth();

  const [filmes, setFilmes] = useState([]);
  const [sessoes, setSessoes] = useState([]);

  const [filmeId, setFilmeId] = useState("");
  const [sessaoId, setSessaoId] = useState("");
  const [valor, setValor] = useState("");
  const [quantidade] = useState(1);

  // Carregar filmes
  useEffect(() => {
    fetch("http://localhost:3001/Filmes")
      .then((res) => res.json())
      .then((data) => setFilmes(data))
      .catch(() => alert("Erro ao carregar filmes."));
  }, []);

  // Carregar sessões
  useEffect(() => {
    fetch("http://localhost:3001/Sessao")
      .then((res) => res.json())
      .then((data) => setSessoes(data))
      .catch(() => alert("Erro ao carregar sessões."));
  }, []);

  // Ao escolher a sessão → atualiza o preço
  useEffect(() => {
    if (sessaoId) {
      const sessaoSelecionada = sessoes.find((s) => s.id == sessaoId);
      if (sessaoSelecionada) setValor(sessaoSelecionada.preco);
    }
  }, [sessaoId, sessoes]);

  // ENVIAR COMPRA
  const enviarCompra = async () => {
    if (!filmeId || !sessaoId || !valor) {
      alert("Preencha todos os campos!");
      return;
    }

    if (!usuarioLogado) {
      alert("Você precisa estar logado para concluir a compra.");
      return;
    }

    const payload = {
      numero: Math.floor(Math.random() * 90000),
      data_hora: new Date().toISOString().slice(0, 19).replace("T", " "),
      valor_total: valor * quantidade,
      tipo_ingresso: "Normal",

      // 🔥 ID DO USUÁRIO LOGADO
      cliente_id: usuarioLogado.id,

      sessao_id: sessaoId,
      assento_sessao_id: 1,
      pagamento_id: 1,
    };

    const response = await fetch("http://localhost:3001/Ingressos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      alert("Compra concluída com sucesso!");
    } else {
      alert("Erro ao enviar compra!");
    }
  };

  return (
    <>
      <NavBar />

      <div className={styles.container}>
        <h1 className={styles.title}>Comprar Ingresso</h1>

        {/* Filme */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Filme</label>
          <select
            className={styles.select}
            value={filmeId}
            onChange={(e) => setFilmeId(e.target.value)}
          >
            <option value="">Selecione</option>
            {filmes.map((f) => (
              <option key={f.id} value={f.id}>
                {f.titulo}
              </option>
            ))}
          </select>
        </div>

        {/* Sessão */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Sessão</label>
          <select
            className={styles.select}
            value={sessaoId}
            onChange={(e) => setSessaoId(e.target.value)}
          >
            <option value="">Escolha o horário</option>
            {sessoes.map((s) => (
              <option key={s.id} value={s.id}>
                {s.data} - {s.horario_inicial}
              </option>
            ))}
          </select>
        </div>

        {/* Quantidade */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Quantidade</label>
          <input className={styles.input} type="number" value={quantidade} readOnly />
        </div>

        {/* Valor */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Valor (R$)</label>
          <input
            className={styles.input}
            type="text"
            value={valor ? `R$ ${valor}` : ""}
            readOnly
          />
        </div>

        {/* Botão */}
        <button className={styles.button} onClick={enviarCompra}>
          Confirmar Compra
        </button>
      </div>
    </>
  );
}
