const mysql = require("mysql2");

const createConnection = async () => {
  const connection = mysql.createConnection({
    host: "localhost", // Adjust with your DB host
    user: "root", // Adjust with your DB user
    password: "", // Adjust with your DB password
    database: "nouvelle_teckher", // Adjust with your DB name
  });

  return connection.promise(); // Use promise-based connection for async/await
};

module.exports = { createConnection };
