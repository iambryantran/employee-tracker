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

// Add Department Path
// {
//     type: 'input',
//     message: 'Department Name: ',
//     name: 'newDepartment',
// }

// Add Role Path
// {
//     type: 'input',
//     message: 'Role Name: ',
//     name: 'newRole',
// },
// {
//     type: 'input',
//     message: 'Role Salary: ',
//     name: 'newRoleSalary',
// },
// {
//     type: 'list',
//     message: 'Role Department: ',
//     name: 'newRoleDepartment',
//     choices: ['Leadership', 'Operations', 'Tech', 'Finance'] // TODO: Dynamically bring in departments, just in case there is a new department
// }

// Add Employee Path
// {
//     type: 'input',
//     message: 'Employee First Name: ',
//     name: 'newFirstName',
// },
// {
//     type: 'input',
//     message: 'Employee Last Name: ',
//     name: 'newLastName',
// },
// {
//     type: 'list',
//     message: 'Employee Role: ',
//     name: 'newEmployeeRole',
//     choices: [] // TODO: Dynamically bring in roles, just in case there is a new role
// },
// {
//     type: 'list',
//     message: 'Employee's Manager: ',
//     name: 'newEmployeeManager',
//     choices: [] // TODO: Dynamically bring in employee list, just in case there is a new employee
// }