const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cardata'
});

connection.connect();

const repairTypes = {
  'A': 1,
  'B': 1,
  'C': 3,
  'D': 2,
  'E': 3,
  'F': 2.5
};


connection.end();