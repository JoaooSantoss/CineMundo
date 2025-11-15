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
    console.log("  Conectado ao SQL Server (SALA)!");
  } catch (error) {
    console.log("  Erro na conexão com o BD:", error);
  }
}

conectaBD();

/*********** Funções para manipular dados da tabela SALA ***********/

// Buscar todos as salas
async function consultaTodosAsSalas() {
  const resultados = await mssql.query("SELECT * FROM SALA");
  console.log(" Dados da tabela SALA:");
  console.log(resultados.recordset);
  return resultados.recordset;
}

// Buscar sala por ID
async function consultaSalaEspecifica(id) {
  const resultados = await mssql.query(`SELECT * FROM SALA WHERE id = ${id}`);
  console.log(` Dados da sala ID: ${id}`);
  console.log(resultados.recordset);
  return resultados.recordset;
}

// Inserir nova sala
async function inserirSala(sala) {
  const query = `
    INSERT INTO SALA (
      nome_sala, capacidade, tipo_projecao, tipo_sala
    ) VALUES (
      '${sala.nome_sala}', '${sala.capacidade}', '${sala.tipo_projecao}', 
      '${sala.tipo_sala}'
    )
  `;
  await mssql.query(query);
  console.log(" Sala inserida com sucesso!");
}

// Atualizar sala existente
async function atualizarSala(id, sala) {
  const query = `
    UPDATE SALA SET 
      nome_sala='${sala.nome_sala}', 
      capacidade='${sala.capacidade}', 
      tipo_projecao='${sala.tipo_projecao}',
      tipo_sala='${sala.tipo_sala}'
    WHERE id=${id}
  `;
  await mssql.query(query);
  console.log(` Sala ${id} atualizada com sucesso!`);
}

async function deletarSala(id) {
  const query = (`DELETE FROM SALA WHERE id = ${id}`);
  await mssql.query(query);
  console.log(` SALA ${id} deletada com sucesso!`);
}


module.exports = {
    consultaTodosAsSalas,
    consultaSalaEspecifica,
    inserirSala,
    atualizarSala,
    deletarSala,
}