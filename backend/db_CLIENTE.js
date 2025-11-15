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
    console.log("  Conectado ao SQL Server (CLIENTE)!");
  } catch (error) {
    console.log("  Erro na conexão com o BD:", error);
  }
}

conectaBD();

/*********** Funções para manipular dados da tabela CLIENTE ***********/

// Buscar todos os clientes
async function consultaTodosOsClientes() {
  const resultados = await mssql.query("SELECT * FROM CLIENTE");
  console.log(" Dados da tabela CLIENTE:");
  console.log(resultados.recordset);
  return resultados.recordset;
}

// Buscar cliente por ID
async function consultaClienteEspecifico(id) {
  const resultados = await mssql.query(`SELECT * FROM CLIENTE WHERE id = ${id}`);
  console.log(`Dados do cliente ID: ${id}` );
  console.log(resultados.recordset);
  return resultados.recordset;
}

// Inserir novo cliente
async function inserirCliente(cliente) {
  const query = `
    INSERT INTO CLIENTE (
      cpf, nome_completo, data_aniversario, endereco_completo, 
      celular, email, senha, paga_meia_entrada
    ) VALUES (
      '${cliente.cpf}', '${cliente.nome_completo}', '${cliente.data_aniversario}', 
      '${cliente.endereco_completo}', '${cliente.celular}', '${cliente.email}', 
      '${cliente.senha}', '${cliente.paga_meia_entrada}'
    )
  `;
  await mssql.query(query);
  console.log(" Cliente inserido com sucesso!");
}

// Atualizar cliente existente
async function atualizarCliente(id, cliente) {
  const query = `
    UPDATE CLIENTE SET 
      cpf='${cliente.cpf}', 
      nome_completo='${cliente.nome_completo}', 
      data_aniversario='${cliente.data_aniversario}',
      endereco_completo='${cliente.endereco_completo}',
      celular='${cliente.celular}', 
      email='${cliente.email}', 
      senha='${cliente.senha}', 
      paga_meia_entrada='${cliente.paga_meia_entrada}'
    WHERE id=${id}
  `;
  await mssql.query(query);
  console.log( `Cliente ${id} atualizado com sucesso!`);
}

// Deletar cliente por ID
async function deletarCliente(id) {
  await mssql.query(`DELETE FROM CLIENTE WHERE id = ${id}`);
  console.log( `Cliente ${id} deletado com sucesso!`);
}

module.exports = {
  consultaTodosOsClientes,
  consultaClienteEspecifico,
  inserirCliente,
  atualizarCliente,
  deletarCliente,
};