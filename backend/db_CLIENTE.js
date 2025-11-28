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
    // 1. Validação básica de campos obrigatórios
    if (!cliente.cpf || !cliente.email || !cliente.senha || !cliente.nome_completo) {
        return { erro: "Campos obrigatórios faltando (cpf, email, senha, nome_completo)" };
    }

    try {
        const request = new mssql.Request();

        // 2. Preparando os inputs (Proteção contra SQL Injection)
        request.input('cpf', mssql.VarChar, cliente.cpf);
        request.input('nome', mssql.VarChar, cliente.nome_completo);
        
        // Se vier data, usa. Se não, manda null (o banco decide ou fica null)
        request.input('niver', mssql.Date, cliente.data_aniversario || null);
        
        request.input('endereco', mssql.VarChar, cliente.endereco_completo || null);
        request.input('celular', mssql.VarChar, cliente.celular || null);
        request.input('email', mssql.VarChar, cliente.email);
        request.input('senha', mssql.VarChar, cliente.senha);
        
        // SQL Server usa BIT (0 ou 1). Convertemos true/false para 1/0
        const meiaEntrada = cliente.paga_meia_entrada ? 1 : 0;
        request.input('meia', mssql.Bit, meiaEntrada);

        // 3. A Query Segura
        const query = `
            INSERT INTO CLIENTE (
                cpf, nome_completo, data_aniversario, endereco_completo, 
                celular, email, senha, paga_meia_entrada
            ) VALUES (
                @cpf, @nome, @niver, @endereco, 
                @celular, @email, @senha, @meia
            )
        `;

        await request.query(query);
        console.log(`✅ Cliente inserido: ${cliente.nome_completo}`);
        
        return { sucesso: true };

    } catch (erro) {
        // Captura erro de CPF ou Email duplicado (Violação de chave única)
        if (erro.number === 2627 || erro.number === 2601) {
            console.error("⚠️ Tentativa de cadastro duplicado.");
            return { erro: "CPF ou Email já cadastrados no sistema." };
        }

        console.error("❌ Erro ao inserir cliente:", erro);
        return { erro: "Erro interno ao cadastrar cliente." };
    }
}

// Verificar se cliente está cadastrado
async function verificaLogin(email, senha) {
  try {
    const request = new mssql.Request();

    request.input('emailUsuario', mssql.VarChar, email);
    request.input('senhaUsuario', mssql.VarChar, senha);

    const query = `
      SELECT * FROM CLIENTE
      WHERE email = @emailUsuario AND senha = @senhaUsuario
    `;

    const resultados = await request.query(query);

    console.log(` Dados do CLIENTE: `);
    console.log(resultados.recordset);
    return resultados.recordset;
  } catch (erro) {
    console.error("Erro ao consultar cliente:", erro);
    return [];
  }
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
  verificaLogin,
  inserirCliente,
  atualizarCliente,
  deletarCliente,
};