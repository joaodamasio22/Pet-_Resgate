//parte de ligação do cliente ao servidor

const express = require('express')
const app = express()

app.use(express.json())
const cors = require('cors')
app.use(cors())

const { Pool } = require ('pg')
const pool = new Pool({
    user: "postgres",
    password: "1234567890",
    host: "localhost",
    port: 5432,
    database: "Pet-Resgate"
})

const bcrypt = require('bcrypt')


//ROTA DE CADASTRO DO CLIENTE


app.post('/cadastro', async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const senhacriptografada = await bcrypt.hash(senha, 10);
    await pool.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)",
      [nome, email, senhacriptografada]
    );
    res.json({ mensagem: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensagem: "Erro ao cadastrar usuário." });
  }
});


// ROTA DE LOGIN DO CLIENTE


app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
    if (result.rows.length === 0) return res.status(401).json({ erro: "Usuário não encontrado" });

    const usuario = result.rows[0];
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) return res.status(401).json({ erro: "Senha incorreta" });

    res.json({ mensagem: "Login bem-sucedido!", nome: usuario.nome });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao fazer login" });
  }
});


// INICIA O SERVIDOR


const PORT = 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})

