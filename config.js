
module.exports = {
    port: "3001",
    ip: "localhost:",
    dbConfig: {
      user: 'postgres',
      host: 'localhost',
      database: 'divide_ai_db',
      password: 'postgres',
      port: 5432,
    },
    jwtSecret: 'mysecretkey',

    currentUser: {
      name: "null",
      email: "null",
      id: -1,
    }
  };