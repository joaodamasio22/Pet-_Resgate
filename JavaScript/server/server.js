// ------------------------------
// CONFIGURAÇÕES INICIAIS
// ------------------------------

const express = require("express");
const cors = require("cors");
const path = require("path"); // <--- adicionado
const app = express();

app.use(cors({
  origin: ["http://localhost:5501", "http://127.0.0.1:5501"] // <---- libera o Live Server
}));

app.use(express.json());

// ------------------------------
// SERVIR O FRONTEND
// ------------------------------
app.use(express.static(path.join(__dirname, "../../"))); // <--- serve seus HTML, CSS e JS

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../index.html"));
});

// ------------------------------
// CONEXÃO COM O BANCO DE DADOS
// ------------------------------

const { Pool } = require("pg");
const bcrypt = require("bcrypt");

const pool = new Pool({
  user: "postgres",
  password: "1234567890",
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
    console.log("Erro: algum campo está vazio");
    return res.status(400).json({ mensagem: "Preencha todos os campos!" });
  }

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);
    await pool.query(
      "INSERT INTO usuario (nome, email, senha, estado, cidade) VALUES ($1, $2, $3, $4, $5)",
      [nome, email, senhaCriptografada, estado, cidade]
    );
    res.json({ mensagem: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    console.error("Erro no banco de dados:", err);
    res.status(500).json({ mensagem: "Erro ao cadastrar usuário." });
  }
});

// ------------------------------
// ROTA DE LOGIN DO CLIENTE
// ------------------------------

app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const result = await pool.query("SELECT * FROM usuario WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ erro: "Usuário não encontrado" });
    }

    const usuario = result.rows[0];
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ erro: "Senha incorreta" });
    }

    console.log("Usuário logado com sucesso:", usuario.nome);
    res.json({ mensagem: "Login bem-sucedido", nome: usuario.nome });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao fazer login" });
  }
});

// ------------------------------
// INICIA O SERVIDOR
// ------------------------------

const PORT = process.env.PORT || 3000; // <--- usa porta dinâmica no Render
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});