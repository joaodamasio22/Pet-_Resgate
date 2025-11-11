// ------------------------------
// CONFIGURAÇÕES INICIAIS
// ------------------------------
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");

const app = express();

app.use(cors({
  origin: ["http://localhost:5501", "http://127.0.0.1:5501"]
}));

app.use(express.json());

// ------------------------------
// BANCO DE DADOS (PostgreSQL)
// ------------------------------
const pool = new Pool({
  user: "postgres",
  password: "#",
  host: "localhost",
  port: 5432,
  database: "Pet-Resgate"
});

// ------------------------------
// ROTAS DO CADASTRO
// ------------------------------
app.post("/cadastro", async (req, res) => {
  console.log("📩 Dados recebidos do frontend:", req.body);
  const { nome, email, senha, estado, cidade } = req.body;

  if (!nome || !email || !senha || !estado || !cidade) {
    return res.status(400).json({ mensagem: "Preencha todos os campos!" });
  }

  try {
    const senhaCripto = await bcrypt.hash(senha, 10);
    await pool.query(
      "INSERT INTO usuario (nome, email, senha, estado, cidade) VALUES ($1, $2, $3, $4, $5)",
      [nome, email, senhaCripto, estado, cidade]
    );
    res.json({ mensagem: "Usuário cadastrado com sucesso!" });
  } catch (erro) {
    console.error("❌ Erro no banco de dados:", erro);
    res.status(500).json({ mensagem: "Erro ao cadastrar usuário." });
  }
});

// ------------------------------
// ROTAS DO LOGIN
// ------------------------------
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const result = await pool.query("SELECT * FROM usuario WHERE email = $1", [email]);
    if (result.rows.length === 0)
      return res.status(401).json({ erro: "Usuário não encontrado" });

    const usuario = result.rows[0];
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta)
      return res.status(401).json({ erro: "Senha incorreta" });

    console.log("✅ Usuário logado com sucesso:", usuario.nome);
    res.json({ mensagem: "Login bem-sucedido", nome: usuario.nome });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: "Erro ao fazer login" });
  }
});

// ------------------------------
// ROTAS DO IBGE
// ------------------------------
app.get("/estados", async (req, res) => {
  try {
    const resposta = await axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome");
    res.json(resposta.data);
  } catch (erro) {
    console.error("❌ Erro ao buscar estados:", erro);
    res.status(500).json({ erro: "Erro ao buscar estados" });
  }
});

app.get("/cidades/:uf", async (req, res) => {
  const { uf } = req.params;
  try {
    const resposta = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
    res.json(resposta.data);
  } catch (erro) {
    console.error("❌ Erro ao buscar cidades:", erro);
    res.status(500).json({ erro: "Erro ao buscar cidades" });
  }
});

// ------------------------------
// INICIAR SERVIDOR
// ------------------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});