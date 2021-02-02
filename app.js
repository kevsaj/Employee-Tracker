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
      trackerfunction();
    }
  )
}

const trackerfunction = () => {
  inquirer.prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do, yo?',
      choices: [
        'Add Employee, yo',
        'View Employees, yo',
        'EXIT'
      ]
    })
    .then(answer => {
      switch (answer.action) {
        case 'Add Employee, yo':
          addEmployee();
          break;
        case 'View Employees, yo':
          viewEmployees();
          break;
        default:
          //EXIT
          connection.end();
      }
    });
};

const addEmployee = () => {
  let currentRoles = [];
  connection.query(
    'SELECT title FROM _ROLE',
    function (err, res) {
      if (err) throw err;
      res.forEach(title => currentRoles.push(title.title))
    }
  )
  inquirer.prompt([{
        type: 'input',
        message: 'Input employee\'s first name yo:',
        name: 'firstName'
      },
      {
        type: 'input',
        message: 'Input employee\'s last name yo:',
        name: 'lastName'
      }
    ])
    .then((inputs) => {
      connection.query(
          "insert into employees table ?", {
            first_name: inputs.firstName,
            last_name: inputs.lastName
          }
        ),
        (err, res) => {
          if (err) console.log(err);
        }
      trackerfunction();
    })
}

const viewEmployees = () => {
  const query = connection.query(
    'SELECT id, first_name, last_name, title, department, salary, manager FROM employees',
    function (err, res) {
      if (err) throw err;
      console.table(res);
      trackerfunction();
    }
  )
}