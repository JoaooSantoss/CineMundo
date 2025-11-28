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
  if (!acesso.cliente_id) {
      return { erro: "Campo obrigatório ausente: cliente_id" };
  }

  try {
      const request = new mssql.Request();
      
      // --- AJUSTE DE HORA AQUI ---
      const dataBrasil = new Date();
      dataBrasil.setHours(dataBrasil.getHours() - 3);

      const dataFinal = acesso.data_acesso || dataBrasil;

      request.input('clienteId', mssql.Int, acesso.cliente_id);
      request.input('dataAcesso', mssql.DateTime, acesso.data_acesso || dataBrasil);

      const query = `
          INSERT INTO ACESSO (cliente_id, data_hora)
          VALUES (@clienteId, @dataAcesso)
      `;
      await request.query(query);

      console.log(`✅ Acesso registrado. ID: ${acesso.cliente_id} | Data: ${dataFinal}`);
      return { sucesso: true };

  } catch (erro) {
      console.error("❌ Erro ao inserir acesso:", erro);
      return { erro: "Erro interno ao inserir acesso" };
  }
}


module.exports = {
  listaTodosAcessos,
  listaAcessoEspecifico,
  insereAcesso,
};