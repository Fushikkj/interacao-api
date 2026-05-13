const express = require('express');
const pool = require('./config/db');
const port = 3000;

const app = express();
app.use(express.json());

const tabela = 'frutas_daniel';

app.get('/frutas', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM ${tabela}`);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

app.get('/frutas/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM ${tabela} WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ mensagem: 'essa fruta nem existe fi' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

app.post('/frutas', async (req, res) => {
  const { nome } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO ${tabela} (nome)
       VALUES ($1)
       RETURNING *`,
      [nome]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

app.put('/frutas/:id', async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  try {
    const result = await pool.query(
      `UPDATE ${tabela}
       SET nome = $1
       WHERE id = $2
       RETURNING *`,
      [nome, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

app.patch('/frutas/:id', async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  try {
    const result = await pool.query(
      `UPDATE ${tabela}
       SET nome = COALESCE($1, nome)
       WHERE id = $2
       RETURNING *`,
      [nome, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

app.delete('/frutas/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      `DELETE FROM ${tabela}
       WHERE id = $1`,
      [id]
    );

    res.json({ mensagem: 'Fruta removida com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

app.listen(process.env.PORT, () => {
   console.log(`isso ta rodando numa http://localhost3000 ${port}`)
});