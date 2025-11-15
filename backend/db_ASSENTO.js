require("dotenv").config();
const mssql = require("mssql");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: { trustServerCertificate: true },
};

// Função de conexão
async function conectaBD() {
  try {
    await mssql.connect(config);
    console.log("  Conectado ao SQL Server (FILME)!");
  } catch (error) {
    console.log(" Erro na conexão com o BD:", error);
  }
}

conectaBD();

/**** Funções para manipular dados da tabela SESSAO ****/

// GET - Todos os assentos
async function consultaTodasAssento() {
  const resultados = await mssql.query("SELECT * FROM ASSENTO");
  console.log(" Dados da tabela ASSENTO:");
  console.log(resultados.recordset);
  return resultados.recordset;
}

// GET - Assento por ID
async function consultaAssentoEspecifica(id) {
  const resultados = await mssql.query(`SELECT * FROM ASSENTO WHERE id = ${id}`);
  console.log(`Dados do ASSENTO ID: ${id}`);
  console.log(resultados.recordset);
  return resultados.recordset;
}

// POST - Inserir Assento
async function inserirAssento(assento) {
  const query = `
    INSERT INTO ASSENTO (
      sala_id, 
      numero,
      tipo_assento
    )
    VALUES (
      '${assento.sala_id}',
      '${assento.numero}',
      '${assento.tipo_assento}'
    )
  `;
  await mssql.query(query);
  console.log(" Assento inserido com sucesso!");
}

module.exports = {
  consultaTodasAssento,
  consultaAssentoEspecifica,
  inserirAssento,
};
