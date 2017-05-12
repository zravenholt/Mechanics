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
    });
  }
  return mechanics;
};

const display = function (data) {
  console.log('------------------ MECHANICS DATA -------------------');
  console.log('MECHANIC   -   TASK   -   AVERAGE TIME   -   RATIO');
  for (let person in data) {
    for (task in data[person]) {
      if (data[person][task].average > 0) {
      // ^^^ allows for possibility that a person may not have done a task, making average === NaN
        let str = `${person}     ||    ${task}     ||    ${Math.round(data[person][task].average * 100) / 100}     ||    ${Math.round(data[person][task].ratio * 100) / 100}`;
        console.log(str);
        console.log('_____________________________________________________');
      }
    }
  }
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
    });
  } else { 
    console.log('Error while performing Query.'); 
  }

  let changedData = convertData(mechanics);
  let avgs = findAverages(changedData);
  display(avgs);
});


connection.end();