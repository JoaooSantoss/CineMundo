require("dotenv").config();
const mssql = require("mssql");

// Configuração da conexão SQL Server
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: { trustServerCertificate: true },
};

// Função de conexão com o banco
async function conectaBD() {
  try {
    await mssql.connect(config);
    console.log("  Conectado ao SQL Server (PAGAMENTO)!");
  } catch (error) {
    console.log("  Erro na conexão com o BD:", error);
  }
}

conectaBD();

/*********** Funções para manipular dados da tabela PAGAMENTO ***********/

// Buscar todos os PAGAMENTOS
async function consultaTodosOsPagamentos() {
  const resultados = await mssql.query("SELECT * FROM PAGAMENTO");
  console.log(" Dados da tabela PAGAMENTO:");
  console.log(resultados.recordset);
  return resultados.recordset;
}

// Buscar PAGAMENTO por ID
async function consultaPagamentoEspecifico(id) {
  const resultados = await mssql.query(`SELECT * FROM PAGAMENTO WHERE id = ${id}`);
  console.log(` Dados do pagamento ID: ${id}`);
  console.log(resultados.recordset);
  return resultados.recordset;
}

// Inserir novo PAGAMENTO
async function inserirPagamento(pagamento) {
  const query = `
    INSERT INTO PAGAMENTO (
      forma_pagamento_id, data_hora, valor_pago 
    ) VALUES (
      '${pagamento.forma_pagamento_id}', '${pagamento.data_hora}', '${pagamento.valor_pago}'
    )
  `;
  await mssql.query(query);
  console.log(" Pagamento inserido com sucesso!");
}


module.exports = {
    consultaTodosOsPagamentos,
    consultaPagamentoEspecifico,
    inserirPagamento,
}