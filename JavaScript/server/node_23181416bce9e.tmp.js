//ligação do cliente ao servidor

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors({
  origin: ["http://localhost:5501", "http://127.0.0.1:5501"]// <---- libera o Live Server
}));

app.use(express.json());

const { Pool } = require ('pg')
const pool = new Pool({
    user: "postgres",
    password: "#",
    host: "localhost",
    port: 5432,
    database: "Pet-Resgate"
})

const bcrypt = require('bcrypt')


//ROTA DE CADASTRO DO CLIENTE


app.post('/cadastro', async (req, res) => {
  console.log("Dados recebidos do frontend:", req.body)
  const { nome, email, senha, estado, cidade } = req.body

  if (!nome || !email || !senha || !estado || !cidade) {
    console.log("Erro: algum campo está vazio");
    return res.status(400).json({ mensagem: "Preencha todos os campos!" })
  }

 try {
    const senhacriptografada = await bcrypt.hash(senha, 10)
    await pool.query(
      "INSERT INTO usuario (nome, email, senha, estado, cidade) VALUES ($1, $2, $3, $4, $5)",
      [nome, email, senhacriptografada, estado, cidade]
    )
    res.json({ mensagem: "Usuário cadastrado com sucesso!" })
  } catch (err) {
    console.error("Erro no banco de dados:", err)
    res.status(500).json({ mensagem: "Erro ao cadastrar usuário." })
  }
})


// ROTA DE LOGIN DO CLIENTE


app.post("/login", async (req, res) => {
  const { email, senha } = req.body

  try {
    const result = await pool.query("SELECT * FROM usuario WHERE email = $1", [email])
    if (result.rows.length === 0) return res.status(401).json({ erro: "Usuário não encontrado" })

    const usuario = result.rows[0]
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)

    if (!senhaCorreta) return res.status(401).json({ erro: "Senha incorreta" })

    console.log("Usuário logado com sucesso:", usuario.nome)
    res.json({ mensagem: "Login bem-sucedido", nome: usuario.nome })
  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: "Erro ao fazer login" })
  }
})
  

// INICIA O SERVIDOR


const PORT = 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})

