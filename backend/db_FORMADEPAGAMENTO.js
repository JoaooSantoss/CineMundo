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

/**** Funções para manipular dados da tabela FORMADEPAGAMENTO ****/

// === GET FORMADEPAGAMENTO ===
async function listarFormasPagamento() {
  const result = await mssql.query(`SELECT * FROM FORMA_PAGAMENTO`);
  return result.recordset;
}

// === GET FORMADEPAGAMENTO COM ID  ===
async function listarFPcomID(id) {
  try {
    const request = new mssql.Request();
    request.input('id', mssql.Int, id);
    const result = await request.query(`SELECT * FROM FORMA_PAGAMENTO WHERE id = ${id}`);
    return result.recordset;
  } catch (err) {
    console.error(`Erro ao buscar forma de pagamento com ID ${id}:`, err.message);
    return [];
  }
}


// === POST FORMADEPAGAMENTO ===
async function inserirFormaPagamento(forma) {
  const query = `
    INSERT INTO FORMA_PAGAMENTO (descricao, valor_acrescimo)
    VALUES (@descricao, @valor_acrescimo)
  `;

  const request = new mssql.Request();
  request.input('descricao', mssql.VarChar(50), forma.descricao);
  request.input('valor_acrescimo', mssql.Decimal(10, 2), forma.valor_acrescimo);

  await request.query(query);
  console.log("Forma de pagamento inserida com sucesso!");
}

module.exports = {
  inserirFormaPagamento,
  listarFPcomID,
  listarFormasPagamento
};