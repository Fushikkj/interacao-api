const express = require('express');
const app = express();
const pool = require('./db');

require('dotenv').config();

app.use(express.json());

app.get('/', async (req, res) => {
  const result = await pool.query('SELECT NOW()');
  res.json(result.rows);
});

app.listen(process.env.API_PORT, () => {
  console.log('Servidor rodando na porta ' + process.env.API_PORT);
});