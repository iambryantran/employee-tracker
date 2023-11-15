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
        choices: ['View All Departments', 'Add Department', 'View All Roles', 'Add Role', 'View All Employees', 'View Employees by Manager', 'View Employees by Department', 'Add Employee', 'Update Employee Role', 'Update Employee Manager', 'Exit'],
        // TODO: Consider adding ', 'Delete Departments, Roles, or Employees', 'View Total Utilized Budget'
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
        choices: ['1', '2', '3', '4'], // TODO: Dynamically bring in departments, just in case there is a new department
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
        choices: ['1', '2', '3', '4'], // TODO: Dynamically bring in roles, just in case there is a new role
    },
    {
        type: 'list',
        message: "Employee's Manager: ",
        name: 'newEmployeeManager',
        choices: ['1', '2', '3', '4'], // TODO: Dynamically bring in employee list, just in case there is a new employee
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
            case 'View Employees by Manager':
                displayEmployeesByManager();
                break;
            // case 'View Employees by Department':
            //     displayEmployeesByDepartment();
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
            case 'Update Employee Role': 
                updateEmployeeRole(); 
                break;
            case 'Update Employee Manager':
                updateEmployeeManager();
                break;
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

        db.query(sql, [values], (err) => {
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
        const sql = 'INSERT INTO roles SET ?';
        // (title, salary, department_id) VALUES 
        const values = {
            title: newRole, 
            salary: parseInt(newRoleSalary), 
            department_id: parseInt(newRoleDepartment)
        };

        db.query(sql, values, (err) => {
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
        const sql = 'INSERT INTO employees SET ?';
        // (first_name, last_name, role_id, manager_id) VALUES
        const values = {
            first_name: newFirstName, 
            last_name: newLastName, 
            role_id: parseInt(newEmployeeRole), 
            manager_id: parseInt(newEmployeeManager)
        };

        db.query(sql, values, (err) => {
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
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result);
    })
    startMenu();
};

// View Roles
const displayRoles = () => {
    const sql = 'SELECT * FROM roles';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result);
    })
    startMenu();
};

// View Employees
const displayEmployees = () => {
    const sql = 'SELECT * FROM employees';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result);
    })
    startMenu();
};

// View Employees by Manager
const displayEmployeesByManager = () => {
    const sql = 'SELECT * FROM employees ORDER BY manager_id';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.table(result);
    })
    startMenu();
};

// // View Employees by Department
// const displayEmployeesByDepartment = () => {
//     const sql = 'SELECT * FROM employees ORDER BY department_id';
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.table(result);
//     })
//     startMenu();
// };

// ------------------------------------------------------ Update Paths ------------------------------------------------------
// Update Employee Roles
const updateEmployeeRole = async () => {

    
    // Gets Employees and Roles
    const getEmployees = async () => {
        const sql = 'SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employees';
        return new Promise((resolve, reject) => {
            db.query(sql, (err, res) => {
                if (err) reject(err);
                resolve(res);
            })
        })
    };
        
    const getRoles = async () => {
        const sql = 'SELECT id, title FROM roles';
        return new Promise((resolve, reject) => {
            db.query(sql, (err, res) => {
                if (err) reject(err);
                resolve(res);
            });
        });
    };
        
    try {
        // Get Employees and Roles
        const employees = await getEmployees();
        const roles = await getRoles();
        
        const employeeChoices = employees.map(emp => ({
            name: emp.name,
            value: emp.id
        }));
        
        const roleChoices = roles.map(roles => ({
            name: roles.name,
            value: roles.id
        }));

        // Update Questions
        const updatePath = [
            {
                type: 'list',
                message: 'Select Employee: ',
                name: 'updateEmployee',
                choices: employeeChoices,
            },
            {
                type: 'list',
                message: 'New Role: ',
                name: 'updateRole',
                choices: roleChoices,
            }
        ];

        const userResponse = await inquirer.prompt(updatePath);
        const { updateEmployee, updateRole } = userResponse;
        const sql = 'UPDATE employees SET role_id = ? WHERE id = ?'; 
        const values = [ updateRole, updateEmployee];
        db.query(sql, values, (err) => {
            if (err) throw err;
            console.log('Entry Updated!');
        })
        startMenu();
    } catch (err) {
        console.log(err)
    }
};

// Update Employee Managers
const updateEmployeeManager = async () => {

    
    // Gets Employees and Roles
    const getEmployees = async () => {
        const sql = 'SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employees';
        return new Promise((resolve, reject) => {
            db.query(sql, (err, res) => {
                if (err) reject(err);
                resolve(res);
            })
        })
    };
        
    const getManagers = async () => {
        const sql = 'SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employees';
        return new Promise((resolve, reject) => {
            db.query(sql, (err, res) => {
                if (err) reject(err);
                resolve(res);
            });
        });
    };
        
    try {
        // Get All Employees twice, once 
        const employees = await getEmployees();
        const managers = await getManagers();
        
        const employeeChoices = employees.map(emp => ({
            name: emp.name,
            value: emp.id
        }));
        
        const managerChoices = managers.map(managers => ({
            name: managers.name,
            value: managers.id
        }));

        // Update Questions
        const updateManagerPath = [
            {
                type: 'list',
                message: 'Select Employee: ',
                name: 'updateEmployee',
                choices: employeeChoices,
            },
            {
                type: 'list',
                message: 'New Manager: ',
                name: 'updateManager',
                choices: managerChoices,
            }
        ];

        const userResponse = await inquirer.prompt(updateManagerPath);
        const { updateEmployee, updateManager } = userResponse;
        const sql = 'UPDATE employees SET manager_id = ? WHERE id = ?'; 
        const values = [ updateManager, updateEmployee];
        db.query(sql, values, (err) => {
            if (err) throw err;
            console.log('Entry Updated!');
        })
        startMenu();
    } catch (err) {
        console.log(err)
    }
};
startMenu();