require("dotenv").config();
const express = require("express");
const cors = require("cors");

const dbFilme = require("./db_FILME");
const dbAcesso = require("./db_ACESSO");
const dbGenero = require("./db_GENERO");
const dbCliente = require("./db_CLIENTE");
const dbSessao = require("./db_SESSAO");
const dbSala = require("./db_SALA");
const dbAssento = require("./db_ASSENTO");
const dbFormaPagamento = require("./db_FORMADEPAGAMENTO");
const dbIngresso = require("./db_INGRESSO");
const dbPagamento = require("./db_PAGAMENTO");


const app = express();
app.use(cors());
app.use(express.json());



// ========================
// FILME - ENDPOINTS
// ========================

// GET - Todos os filmes
app.get("/Filmes", async (req, res) => {
  const filmes = await dbFilme.selecionaTodosFilmes();
  res.json(filmes);
});

// GET - Filme por ID
app.get("/Filmes/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const filme = await dbFilme.listaFilmeEspecifico(id);
  res.json(filme);
});

// POST - Inserir filme
app.post("/Filmes", async (req, res) => {
  const filme = req.body;
  await dbFilme.insereFilme(filme);
  res.send(" Filme inserido com sucesso!");
});

// PUT - Atualizar filme
app.put("/Filmes/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const filme = req.body;
  await dbFilme.atualizaFilme(id, filme);
  res.send(" Filme atualizado com sucesso!");
});

// DELETE - Apagar filme
app.delete("/Filmes/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await dbFilme.apagaFilme(id);
  res.send(" Filme deletado com sucesso!");
});




// ========================
// ACESSO - ENDPOINTS
// ========================

// GET - Todos os acessos
app.get("/Acessos", async (req, res) => {
  try {
    const acessos = await dbAcesso.listaTodosAcessos();
    res.status(200).json(acessos);
  } catch (err) {
    console.error("Erro ao buscar acessos:", err);
    res.status(500).json({ erro: "Erro interno ao buscar acessos" });
  }
});

// GET - Acesso específico
app.get("/Acessos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ erro: "ID inválido" });

  try {
    const acesso = await dbAcesso.listaAcessoEspecifico(id);
    if (acesso.length === 0) return res.status(404).json({ erro: "Acesso não encontrado" });
    res.status(200).json(acesso[0]);
  } catch (err) {
    console.error(`Erro ao buscar acesso ${id}:`, err);
    res.status(500).json({ erro: "Erro interno ao buscar acesso" });
  }
});

// POST - Inserir novo acesso
app.post("/Acessos", async (req, res) => {
  const acesso = req.body;
  const resultado = await dbAcesso.insereAcesso(acesso);

  if (resultado.erro) {
    res.status(400).json(resultado);
  } else {
    res.status(201).json(resultado);
  }
});



// ========================
// GENERO - ENDPOINTS
// ========================

// GET - Todos os gêneros
app.get("/Generos", async (req, res) => {
  const generos = await dbGenero.selecionaTodosGenero();
  res.json(generos);
});

// GET - Gênero por ID
app.get("/Generos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const genero = await dbGenero.listaGeneroEspecifico(id);
  res.json(genero);
});

// POST - Inserir gênero
app.post("/Generos", async (req, res) => {
  const genero = req.body;
  await dbGenero.insereGenero(genero);
  res.send(" Gênero inserido com sucesso!");
});



// ========================
// CLIENTE - ENDPOINTS
// ========================

// GET - Todos os clientes
app.get("/Clientes", async (req, res) => {
  const clientes = await dbCliente.consultaTodosOsClientes();
  res.json(clientes);
});

// GET - Cliente por ID
app.get("/Clientes/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const cliente = await dbCliente.consultaClienteEspecifico(id);
  res.json(cliente);
});

// POST - Inserir cliente
app.post("/Clientes", async (req, res) => {
  const cliente = req.body;
  await dbCliente.inserirCliente(cliente);
  res.send(" Cliente inserido com sucesso!");
});

// PUT - Atualizar cliente
app.put("/Clientes/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const cliente = req.body;
  await dbCliente.atualizarCliente(id, cliente);
  res.send(" Cliente atualizado com sucesso!");
});

// DELETE - Remover cliente
app.delete("/Clientes/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await dbCliente.deletarCliente(id);
  res.send(" Cliente deletado com sucesso!");
});

// ========================
// SESSAO - ENDPOINTS
// ========================

// GET - Todas Sessoes
app.get("/Sessao", async (req, res) => {
  const sessao = await dbSessao.listarSessao();
  res.json(sessao);
});

// GET - Consulta por ID
app.get("/Sessao/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const sessao = await dbSessao.consultaSessaoEspecifica(id);
  res.json(sessao);
});

// POST - Inserir Sessao
app.post("/Sessao", async (req, res) => {
  const sessao = req.body;
  await dbSessao.inserirSessao(sessao);
  res.send("Sessao inserida com sucesso!");
});

// PUT - Atualizar Sessao
app.put("/Sessao/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const sessao = req.body;
  await dbSessao.atualizarSessao(id, sessao);
  res.send("Sessao atualizada com sucesso!");
});

// DELETE - Remover Sessao
app.delete("/Sessao/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await dbSessao.deletarSessao(id);
  res.send("Sessao deletada com sucesso!");
});


// ========================
// ASSENTO - ENDPOINTS
// ========================

// GET - Todos ASSENTOS
app.get("/Assento", async (req, res) => {
  const assento = await dbAssento.consultaTodasAssento();
  res.json(assento);
});


//  GET - Consulta por ID
app.get("/Assento/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const assento = await dbAssento.consultaAssentoEspecifica();
  res.json(assento);
});

// POST - Inserir ASSENTO
app.post("/Assento", async (req, res) => {
  const assento = req.body;
  await dbAssento.inserirAssento(assento);
  res.send(" Assento inserido com sucesso!");
});

// ========================
// INGRESSO - ENDPOINTS
// ========================

// GET - Listar todos os ingressos
app.get("/Ingressos", async (req, res) => {
  const ingressos = await dbIngresso.listarIngressos();
  res.json(ingressos);
});

// GET - Ingresso por ID
app.get("/Ingressos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const ingresso = await dbIngresso.buscarIngressoPorId(id);
  res.json(ingresso);
});

// POST - Inserir ingresso
app.post("/Ingressos", async (req, res) => {
  const ingresso = req.body;
  await dbIngresso.inserirIngresso(ingresso);
  res.send("Ingresso inserido com sucesso!");
});

// PUT - Atualizar ingresso
app.put("/Sessao/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const ingresso = req.body;
  await dbIngresso.AtualizarIngresso(id, sessao);
  res.send(" Sessao atualizada com sucesso!");
});


// DELETE - Remover ingresso
app.delete("/Ingressos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await dbIngresso.excluirIngresso(id);
  res.send("Ingresso deletado com sucesso!");
});


// ========================
// FORMASDEPAGAMENTO - ENDPOINTS
// ========================

// GET - Listar todas as formas de pagamento
app.get("/FormasPagamento", async (req, res) => {
  const formas = await dbFormaPagamento.listarFormasPagamento();
  res.json(formas);
});

// GET - Forma de pagamento por ID
app.get("/FormasPagamento/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const forma = await dbFormaPagamento.listarFPcomID(id);
  res.json(forma);
});

// POST - Inserir forma de pagamento
app.post("/FormasPagamento", async (req, res) => {
  const forma = req.body;
  await dbFormaPagamento.inserirFormaPagamento(forma);
  res.send("Forma de pagamento inserida com sucesso!");
});

// ========================
// SALA - ENDPOINTS
// ========================


// GET - Todos as SALAS
app.get("/Salas", async (req, res) => {
  const salas = await dbSala.consultaTodosAsSalas();
  res.json(salas);
});

// GET - SALA por ID
app.get("/Salas/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const sala = await dbSala.consultaSalaEspecifica(id);
  res.json(sala);
});

// POST - Inserir SALA
app.post("/Salas", async (req, res) => {
  const sala = req.body;
  await dbSala.inserirSala(sala);
  res.send(" Sala inserida com sucesso!");
});

// PUT - Atualizar SALA
app.put("/Salas/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const sala = req.body;
  await dbSala.atualizarSala(id, sala);
  res.send(" Sala atualizada com sucesso!");
});

// DELETE - Deletar SALA
app.delete("/Salas/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await dbSala.deletarSala(id);
  res.send(" Sala deletada com sucesso!");
});


// ========================
// PAGAMENTO - ENDPOINTS
// ========================


// GET - Todos os PAGAMENTOS
app.get("/Pagamentos", async (req, res) => {
  const pagamentos = await dbPagamento.consultaTodosOsPagamentos();
  res.json(pagamentos);
});

// GET - PAGAMENTO por ID
app.get("/Pagamentos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const pagamento = await dbPagamento.consultaPagamentoEspecifico(id);
  res.json(pagamento);
});

// POST - Inserir PAGAMENTO
app.post("/Pagamentos", async (req, res) => {
  const pagamento = req.body;
  await dbPagamento.inserirPagamento(pagamento);
  res.send(" Pagamento inserido com sucesso!");
});


// ========================
// INICIANDO SERVIDOR
// ========================

// Inicializar servidor
app.listen(process.env.PORTA, () => {
  console.log(` Servidor NodeJS rodando na porta ${process.env.PORTA}`);
});