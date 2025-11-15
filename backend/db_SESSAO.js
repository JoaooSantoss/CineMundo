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


async function listarSessao() {
  const resultados = await mssql.query("SELECT * FROM SESSAO");
  console.log(" Dados da tabela SESSAO:");
  console.log(resultados.recordset);
  return resultados.recordset;
}

async function consultaSessaoEspecifica(id) {
const resultados = await mssql.query(`SELECT * FROM SESSAO WHERE id = ${id}`);
  console.log(" Dados da  SESSAO ID: ${id}");
  console.log(resultados.recordset);
  return resultados.recordset;
}


// Inserir nova Sessao
async function inserirSessao(sessao) {
  const query = `
  INSERT INTO SESSAO (
    filme_id, sala_id, data, horario_inicial, horario_final,
    lingua_origem, lingua_legenda, lingua_dublagem, preco
  ) VALUES (
    '${sessao.filme_id}', '${sessao.sala_id}', '${sessao.data}', '${sessao.horario_inicial}', '${sessao.horario_final}',
    '${sessao.lingua_origem}', '${sessao.lingua_legenda}', '${sessao.lingua_dublagem}', '${sessao.preco}'
  )
`;
  await mssql.query(query);
  console.log(" Sessao inserido com sucesso!");
}

// Atualizar sessao existente
async function atualizarSessao(id, sessao) {
const query = `
    UPDATE SESSAO SET 
      filme_id='${sessao.filme_id}', 
      sala_id='${sessao.sala_id}', 
      data='${sessao.data}', 
      horario_inicial='${sessao.horario_inicial}', 
      horario_final='${sessao.horario_final}',
      lingua_origem='${sessao.lingua_origem}', 
      lingua_legenda='${sessao.lingua_legenda}', 
      lingua_dublagem='${sessao.lingua_dublagem}', 
      preco='${sessao.preco}'
    WHERE id=${id}
  `;
  await mssql.query(query);
  console.log(` Sessao ${id} atualizado com sucesso!`);
}

// EXCLUIR Sessao
async function deletarSessao(id){
await mssql.query(`DELETE FROM SESSAO WHERE id = ${id}`);
  console.log('Cliente ${id} deletado com sucesso!');
}

module.exports = {
  listarSessao,
  consultaSessaoEspecifica,
  inserirSessao,
  atualizarSessao,
  deletarSessao
};
