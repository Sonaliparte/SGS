import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database:', res.rows);
  }
});

app.post('/contact', async (req, res) => {
  const { name, flat_no, email, message } = req.body;
  
  console.log('Received form data:', req.body);
  
  try {
    await pool.query(
      'INSERT INTO messages (name, flat_no, email, message) VALUES ($1, $2, $3, $4)',
      [name, flat_no, email, message]
    );
    res.json({ message: 'Form submit successfully!' });
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ message: 'Error saving data', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
