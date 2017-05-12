# Mechanics
App that organizes and calculates data from csv file.

## Requirements
- Node
- NPM
- mySQL

### Installing and Use
Make sure that you have mySQL installed and a mySQL server active
From within the root directory:

```sh
npm install
```

Then run: 

```sh
npm run create:db
npm run seed:db
```
to create and seed a SQL database with csv data.

Then, simply run:

```sh
node index.js
```

to run the calculations. Results are printed to the console.