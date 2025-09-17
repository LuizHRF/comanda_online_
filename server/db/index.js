const { Pool } = require('pg');
const config = require('../../config');

const pool = new Pool(config.dbConfig);

pool.on('connect', () => {
  console.log('Connected to the PostgreSQL database.');
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
