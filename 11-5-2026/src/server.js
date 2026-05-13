require('dotenv').config();
const express = require('express');
require('./config/db')
const port = 3000

const app = express();
app.use(express.json());

const tabela = 'frutas_daniel';

app.get('/legumes', async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM ${tabela}`);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

app.get('/legumes/:id', async (req, res) => {
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

app.listen(process.env.PORT, () => {
   console.log(`isso ta rodando numa http://localhost3000 ${port}`)
});