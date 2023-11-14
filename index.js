const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'rootroot',
        database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);

// Main Menu Questions
const mainMenu = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'menu',
        choices: ['View All Departments', 'Add Department', 'View All Roles', 'Add Role', 'View All Employees', 'Add Employee', 'Update Employee Role', 'Exit'],
        // TODO: Consider adding 'Update Employee Manager', 'View Employees by Manager', 'View Employees by Department', 'Delete Departments, Roles, or Employees', 'View Total Utilized Budget'
    }
];

// ------------------------------------------------------ Add Questions ------------------------------------------------------
// Add Department Questions
const depoPath = [
    {
        type: 'input',
        message: 'Department Name: ',
        name: 'newDepo',
    }
];

// Add Role Questions
const rolePath = [
    {
        type: 'input',
        message: 'Role Name: ',
        name: 'newRole',
    },
    {
        type: 'input',
        message: 'Role Salary: ',
        name: 'newRoleSalary',
    },
    {
        type: 'list',
        message: 'Role Department: ',
        name: 'newRoleDepartment',
        choices: ['Leadership', 'Operations', 'Tech', 'Finance'] // TODO: Dynamically bring in departments, just in case there is a new department
    }
];

// Add Employee Questions
const employeePath = [
    {
        type: 'input',
        message: 'Employee First Name: ',
        name: 'newFirstName',
    },
    {
        type: 'input',
        message: 'Employee Last Name: ',
        name: 'newLastName',
    },
    {
        type: 'list',
        message: 'Employee Role: ',
        name: 'newEmployeeRole',
        choices: [] // TODO: Dynamically bring in roles, just in case there is a new role
    },
    {
        type: 'list',
        message: "Employee's Manager: ",
        name: 'newEmployeeManager',
        choices: [] // TODO: Dynamically bring in employee list, just in case there is a new employee
    }
];

// Main Menu
const startMenu = async () => {
    try {
        const userResponse = await inquirer.prompt(mainMenu);
        switch (userResponse.menu) {
            case 'Exit': process.exit();
            case 'View All Departments': 
                displayDepos();
                break;
            case 'View All Roles': 
                displayRoles();
                break;
            case 'View All Employees': 
                displayEmployees();
                break;
            case 'Add Department': 
                addDepo();
                break;
            case 'Add Role': 
                addRole();
                break;
            case 'Add Employee': 
                addEmployee();
                break;
            // case 'Update Employee Role': 
                // updateEmployeeRole(); 
                // break;
        }
    } catch (err) {
        console.log(err);
    }
};

// ------------------------------------------------------ Add Paths ------------------------------------------------------
// Add Department
const addDepo = async () => {
    try {
        const userResponse = await inquirer.prompt(depoPath);
        const { newDepo } = userResponse;
        const sql = 'INSERT INTO departments (name) VALUES ?';
        const values = [[newDepo]];

        db.query(sql, [values], function(err){
            if (err) throw err;
            console.log('Entry Added!')
        })
        startMenu();
    } catch (err) {
        console.log(err);
    }
};

// Add Role
const addRole = async () => {
    try {
        const userResponse = await inquirer.prompt(rolePath);
        const { newRole, newRoleSalary, newRoleDepartment } = userResponse;
        const sql = 'INSERT INTO roles (title, salary, department_id) VALUES ?';
        const values = [[newRole], [newRoleSalary], [newRoleDepartment]];

        db.query(sql, [values], function(err){
            if (err) throw err;
            console.log('Entry Added!')
        })

        startMenu();
    } catch (err) {
        console.log(err);
    }
};

// Add Employee
const addEmployee = async () => {
    try {
        const userResponse = await inquirer.prompt(employeePath);
        const { newFirstName, newLastName, newEmployeeRole, newEmployeeManager } = userResponse;
        const sql = 'INSERT INTO roles (first_name, last_name, role_id, manager_id) VALUES ?';
        const values = [[newFirstName], [newLastName], [newEmployeeRole], [newEmployeeManager]];

        db.query(sql, [values], function(err){
            if (err) throw err;
            console.log('Entry Added!')
        })
        startMenu();
    } catch (err) {
        console.log(err);
    }
};

// ------------------------------------------------------ View Paths ------------------------------------------------------
// View Departments
const displayDepos = () => {
    const sql = 'SELECT * FROM departments';
    db.query(sql, function(err, result){
        if (err) throw err;
        console.table(result);
    })
    startMenu();
};

// View Roles
const displayRoles = () => {
    const sql = 'SELECT * FROM roles';
    db.query(sql, function(err, result){
        if (err) throw err;
        console.table(result);
    })
    startMenu();
};

// View Employees
const displayEmployees = () => {
    const sql = 'SELECT * FROM employees';
    db.query(sql, function(err, result){
        if (err) throw err;
        console.table(result);
    })
    startMenu();
};

startMenu();