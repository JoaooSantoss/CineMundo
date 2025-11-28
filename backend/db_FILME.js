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

/*********** Funções para manipular dados da tabela FILME ***********/

// Mostrar todos os filmes cadastrados
async function selecionaTodosFilmes() {
  const resultados = await mssql.query(`
    SELECT 
      F.id,
      F.titulo,
      F.sinopse,
      F.duracao,
      F.poster,
      G.descricao AS genero_nome
    FROM FILME F
    JOIN GENERO G ON G.id = F.genero_id
  `);

  return resultados.recordset;
}


// Mostrar um filme específico
async function listaFilmeEspecifico(id) {
  const resultados = await mssql.query(`SELECT * FROM FILME WHERE id = ${id}`);
  console.log(" Dados do Filme ID:", id);
  console.log(resultados.recordset);
  return resultados.recordset;
}

// Inserir novo filme
async function insereFilme(filme) {
  const query = `
    INSERT INTO FILME 
      (titulo, sinopse, genero_id, diretor, elenco, classificacao_indicativa, 
      duracao, poster, ano_lancamento, produtora)
    VALUES 
      ('${filme.titulo}', '${filme.sinopse}', ${filme.genero_id}, '${filme.diretor}', '${filme.elenco}', 
      '${filme.classificacao_indicativa}', ${filme.duracao}, '${filme.poster}', ${filme.ano_lancamento}, '${filme.produtora}')
  `;
  await mssql.query(query);
  console.log(" Filme inserido com sucesso!");
}

// Atualizar filme existente
async function atualizaFilme(id, filme) {
  const query = `
    UPDATE FILME SET 
      titulo='${filme.titulo}', 
      sinopse='${filme.sinopse}', 
      genero_id=${filme.genero_id}, 
      diretor='${filme.diretor}', 
      elenco='${filme.elenco}', 
      classificacao_indicativa='${filme.classificacao_indicativa}', 
      duracao=${filme.duracao}, 
      poster='${filme.poster}', 
      ano_lancamento=${filme.ano_lancamento}, 
      produtora='${filme.produtora}'
    WHERE id=${id}
  `;
  await mssql.query(query);
  console.log( `Filme ${id} atualizado com sucesso!`);
}

// Deletar filme por ID
async function apagaFilme(id) {
  await mssql.query(`DELETE FROM FILME WHERE id = ${id}`);
  console.log( `Filme ${id} deletado com sucesso!`);
}

module.exports = {
  selecionaTodosFilmes,
  listaFilmeEspecifico,
  insereFilme,
  atualizaFilme,
  apagaFilme,
};