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
  trackerfunction();
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
        'Show all my Employees, yo',
        'Add Department, yo',
        'Show all Departments, yo',
        'Add Employee Role, yo',
        'EXIT, yo',
        'Restart'
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
        case 'Show all my Employees, yo':
          showEmployees();
          break;
        case 'Add Department, yo':
          addDepartment();
          break;
        case 'Show all Departments, yo':
          showDepartments();
          break;
        case 'Add Employee Role, yo':
          addRole();
          break;
        case 'EXIT, yo':
          connection.end();
          break;
        default:
          trackerfunction();
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
      },
      {
        type: 'input',
        message: 'What is the employee\'s title ?',
        name: 'title'
      },
      {
        type: 'input',
        message: 'Enter department if applicable?',
        name: 'department',
      }
    ])
    .then((inputs) => {
      connection.query(
          "insert into employees table ?", {
            first_name: inputs.firstName,
            last_name: inputs.lastName,
            title: inputs.title,
            department: inputs.department
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

const addDepartment = () => {
  inquirer.prompt([{
      type: 'input',
      message: 'Enter the name of the new department yo:',
      name: 'title'
    }])
    .then((inputs) => {
      connection.query(
          'INSERT into department table ?', {
            title: inputs.department
          }
        ),
        (err, res) => {
          if (err) throw err;
        }
    })
}

const showDepartments = () => {
  connection.query(
    'select * from departments',
    (err, res) => {
      if (err) throw err;
      console.table(res);
      trackerfunction();
    }
  )
}

const addRole = () => {
  inquirer.prompt([{
        type: 'input',
        message: 'Enter new role:',
        name: 'title'
      }
    ])
    .then((responses) => {
      connection.query(
          'insert into roles set ?', {
            title: responses.title
          }
        ),
        (err, res) => {
          if (err) throw err;
          console.table(res);
        }
        trackerfunction();
    })
}