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

const convertDate = function (string) {
  let dropOff = string.split('/');

  dropOff.forEach((num, i) => {
    dropOff[i] = parseInt(num);
  });

  let days = 0;
  days += (dropOff[0] * 30);       //months
  days += (dropOff[1]);               //days
  days += (dropOff[2] * 365);     //years

  return days;
};

const convertData = function (mechanics) {
  for (let person in mechanics) {
    mechanics[person].forEach((event) => {
      event.days = (convertDate(event.pickupdate) - convertDate(event.dropoffdate) + 1);
      event.ratio = event.days / repairTypes[event.repairtype];
    });
  }
  return mechanics;
};

const findAverages = function (mechanics) {
  let output = {};
  for (let person in mechanics) {
    output[person] = {};
    for (let task in repairTypes) {
      let totalDays = 0;
      let count = 0;
      mechanics[person].forEach((event) => {
        if (task === event.repairtype) {
          totalDays += event.days;
          count ++;
        }
      });
      output[person][task] = {
        'average': totalDays / count,
        'ratio': repairTypes[task] / (totalDays / count)
      };
    }
  }
  return output;
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
  let changedData = convertData(mechanics);
  console.log(findAverages(changedData));
});


connection.end();