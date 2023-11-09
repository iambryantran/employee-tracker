// Question 

const inquirer = require('inquirer');

const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'menu',
        choices: ['View All Departments', 'Add Department', 'View All Roles', 'Add Role', 'View All Employees', 'Add Employee', 'Update Employee Role'],
        // TODO: Consider adding 'Update Employee Manager', 'View Employees by Manager', 'View Employees by Department', 'Delete Departments, Roles, or Employees', 'View Total Utilized Budget'
    }
]