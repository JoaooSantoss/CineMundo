require("dotenv").config();
const mssql = require("mssql");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

// Conectar ao banco
async function conectaBD() {
  try {
    await mssql.connect(config);
    console.log("Conectado ao SQL Server (ACESSO)!");
  } catch (error) {
    console.log("Erro na conexão com o BD:", error);
  }
}

conectaBD();

/*********** FUNÇÕES PARA ACESSO ***********/

// Listar todos os acessos
async function listaTodosAcessos() {
  const resultados = await mssql.query("SELECT * FROM ACESSO");
  return resultados.recordset;
}

// Listar acesso específico pelo id
async function listaAcessoEspecifico(id) {
  const resultados = await mssql.query(`SELECT * FROM ACESSO WHERE id = ${id}` 
  );
  return resultados.recordset;
}

// Inserir novo acesso
async function insereAcesso(acesso) {
  if (!acesso.cliente_id || !acesso.data_acesso || !acesso.tipo_acesso) {
    return { erro: "Campos obrigatórios ausentes (cliente_id, data_acesso, tipo_acesso)" };
  }

  try {
     const sql = `
      INSERT INTO acessos (cliente_id, data_acesso, tipo_acesso)
      VALUES (?, ?, ?)
    `;
    const valores = [acesso.cliente_id, acesso.data_acesso, acesso.tipo_acesso];
    const [resultado] = await pool.execute(sql, valores);

    return {
      id: resultado.insertId,
      ...acesso
    };
  } catch (erro) {
    console.error("Erro ao inserir acesso:", erro);
    return { erro: "Erro interno ao inserir acesso" };
  }
  }


module.exports = {
  listaTodosAcessos,
  listaAcessoEspecifico,
  insereAcesso,
};