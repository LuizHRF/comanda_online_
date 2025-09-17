const db = require('../db');

exports.registerUser = async (req, res) => {

  const nome = req.body.name;
  const age = req.body.age;

  console.log('Registering user:', nome, age);

  try {

    const queryText = `
      INSERT INTO usuarios (nome, age)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const result = await db.query(queryText, [nome, age]);
    console.log('User registered:', result.rows[0]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).json({ error: error.message });
  }
};


exports.getall = async (req, res) => {

  try {
    const queryText = `
      SELECT * FROM usuarios;
    `;
    const result = await db.query(queryText);

    console.log('Getting all users');

    res.status(201).json(result.rows);

  } catch (error) {
    console.error('Error getting all users:', error);

    res.status(400).json({ error: error.message });
  }
};
