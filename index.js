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

connection.query('SELECT * from repairs', function(err, rows, fields) {
  let mechanics = {};
  if (!err) {
    rows.forEach((row) => {
      if (mechanics[row.mechanic]) {
        mechanics[row.mechanic].push(row);
      } else {
        mechanics[row.mechanic] = [row];
      }
      // console.log('the current row is: ', row);
      // console.log('row value 1 is: ', row.mechanic);
    });
  } else { 
    console.log('Error while performing Query.'); 
  }

  console.log(mechanics);
});


connection.end();