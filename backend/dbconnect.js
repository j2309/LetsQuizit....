const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "QUIZAPP",
  password: "Janhvi",
  port: 5432,
});

module.exports = pool;
