const mysql = require('mysql');
const inquirer = require('inquirer');
const chalk = require('chalk');

console.log(chalk.yellow('Yo Wat-Up!'));

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'employeesdb'
});