const mysql = require('mysql');
const inquirer = require('inquirer');
const chalk = require('chalk');
const log = console.log;
const error = chalk.bold.red;

log(chalk.blue.bgYellow.bold('Employee Manager'));

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'bcvc2745',
  database: 'employeesdb'
});

connection.connect((err) => {
  if (err) throw err;
  showEmployees();
});

const showEmployees = () => {
  const query = connection.query(
    `SELECT * FROM employeesdb.employees`,
    function (err, res) {
      if (err) throw err;
      console.table(res);
    }
  )
}