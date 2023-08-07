// app.js
const http = require('http');
const mysql = require('mysql');

// MySQL configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'example',
  database: process.env.DB_NAME || 'node_app_db',
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database.');
});

const server = http.createServer((req, res) => {
  if (req.url === '/create') {
    // Create operation
    const newRecord = { name: 'John Doe', age: 30 };
    connection.query('INSERT INTO users SET ?', newRecord, (err, result) => {
      if (err) throw err;
      console.log('Record created:', result.insertId);
      res.end('Record created. ID: ' + result.insertId);
    });
  } else if (req.url === '/read') {
    // Read operation
    connection.query('SELECT * FROM users', (err, results) => {
      if (err) throw err;
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(results));
    });
  } else if (req.url === '/update') {
    // Update operation
    const updatedRecord = { age: 31 };
    connection.query('UPDATE users SET ? WHERE name = ?', [updatedRecord, 'John Doe'], (err, result) => {
      if (err) throw err;
      console.log('Record updated:', result.affectedRows);
      res.end('Record updated. Affected rows: ' + result.affectedRows);
    });
  } else if (req.url === '/delete') {
    // Delete operation
    connection.query('DELETE FROM users WHERE name = ?', ['John Doe'], (err, result) => {
      if (err) throw err;
      console.log('Record deleted:', result.affectedRows);
      res.end('Record deleted. Affected rows: ' + result.affectedRows);
    });
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, Dockerized Node.js App!\n');
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running att http://localhost:${port}/`);
});
