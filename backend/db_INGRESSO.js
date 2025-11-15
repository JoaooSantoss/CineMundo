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

/**** Funções para manipular dados da tabela INGRESSO ****/


// === GET INGRESSO ===
async function listarIngressos() {
  try {
    const result = await mssql.query(`SELECT * FROM INGRESSO`);
    console.log(" Ingressos encontrados:", result.recordset);
    return result.recordset;
  } catch (err) {
    console.error(" Erro ao listar ingressos:", err.message);
  }
}
// === GET INGRESSO COM ID  ===
async function buscarIngressoPorId(id) {
  try {
    const request = new mssql.Request();
    request.input('id', mssql.Int, id);
    const result = await request.query(`SELECT * FROM INGRESSO WHERE id = @id`);
    console.log(`Ingresso encontrado (ID: ${id})`, result.recordset);
    return result.recordset;
  } catch (err) {
    console.error("Erro ao buscar ingresso por ID:", err.message);
  }
}

// === POST INGRESSO ===
async function inserirIngresso(ingresso) {
  try {
    const query = `
      INSERT INTO INGRESSO (
        numero,
        data_hora,
        valor_total,
        tipo_ingresso,
        cliente_id,
        sessao_id,
        assento_sessao_id,
        pagamento_id
      ) VALUES (
        ${ingresso.numero},
        '${ingresso.data_hora}',
        ${ingresso.valor_total},
        '${ingresso.tipo_ingresso}',
        ${ingresso.cliente_id},
        ${ingresso.sessao_id},
        ${ingresso.assento_sessao_id},
        ${ingresso.pagamento_id}
      )
    `;

    await mssql.query(query);
    console.log("Ingresso inserido com sucesso!");
  } catch (err) {
    console.error("Erro ao inserir ingresso:", err.message);
  }
}


//PUT INGRESSO
async function AtualizarIngresso(ingresso) {
  const query = `
  UPDATE INGRESSO SET
        numero = '${ingresso.numero}',
        data_hora= '${ingresso.data_hora}'
        valor_total= '${ingresso.valor_total}',
        tipo_ingresso= '${ingresso.tipo_ingresso}',
        cliente_id= '${ingresso.cliente_id}',
        sessao_id= '${ingresso.sessao_id}',
        assento_sessao_id= '${ingresso.assento_sessao_id}',
        pagamento_id= '${ingresso.pagamento_id}'
        WHERE id =${id}
  `;

  await mssql.query(query);
  console.log(`INGRESSO ${id} atualizado com sucesso`)
}


// === DELETE ===
async function excluirIngresso(id) {
  try {
    const request = new mssql.Request();
    request.input('id', mssql.Int, id);
    await request.query(`DELETE FROM INGRESSO WHERE id = @id`);
    console.log("Ingresso excluído com sucesso!");
  } catch (err) {
    console.error("Erro ao excluir ingresso:", err.message);
  }
}

module.exports = {
  inserirIngresso,
  buscarIngressoPorId,
  listarIngressos,
  AtualizarIngresso,
  excluirIngresso
};