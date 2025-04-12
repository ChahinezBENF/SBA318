const express = require('express');
const router = express.Router();

//import data
const employees = require('../data/employees');
const departments = require('../data/departments');
const roles = require('../data/roles');

//Import the fs module
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/employees.js');

// Get all employees
router.get('/', (req, res) => {
  res.json(employees);
});

// Render the employees page with dynamic data
router.get('/view', (req, res) => {
  
  res.render('employees', { employees });
});


//Manage search 
router.get('/search', (req, res) => {
  const query = req.query.q ? req.query.q.toLowerCase() : ''; 

  const filteredEmployees = query
    ? employees.filter(employee =>
        employee.firstName.toLowerCase().includes(query) ||
        employee.lastName.toLowerCase().includes(query) ||
        employee.role.toLowerCase().includes(query) ||
        employee.department.toLowerCase().includes(query) ||
        String(employee.id).toLowerCase().includes(query)
      )
    : employees; 

  res.render('employees', { employees: filteredEmployees });
});

// Render the Add Employee form
router.get('/add', (req, res) => {
  res.render('addEmployee'); // Render the Add Employee form
});


// Add a new employee
router.post('/', (req, res) => {
  
  const newEmployee = req.body;

  if (!newEmployee || Object.keys(newEmployee).length === 0) {
    return res.status(400).send('Invalid data received.');
  }

  if (employees.some(emp => emp.id == newEmployee.id)) {
    return res.status(400).send('Employee ID must be unique.');
  }

  employees.push(newEmployee);

  fs.writeFileSync(filePath, `module.exports = ${JSON.stringify(employees, null, 2)};`);
  res.redirect('/employees/view'); // Redirect to the main employees page after adding
});



//Update employes 
router.get('/update/:id', (req, res) => {
  const employee = employees.find(emp => emp.id == req.params.id);
  if (employee) {
    res.render('updateEmployee', { employee }); // Prefills the form with the selected employee's data
  } else {
    res.status(404).send('Employee not found.');
  }
});



// Update an employee
router.put('/:id', (req, res) => {
  const { id } = req.params;

  const updatedEmployee = req.body;

  if (!updatedEmployee || !updatedEmployee.firstName || !updatedEmployee.lastName) {
    return res.status(400).send('Invalid data received: Employee must have a first name and last name.');
  }

  const index = employees.findIndex(emp => emp.id == id);
  if (index !== -1) {
    employees[index] = { ...employees[index], ...updatedEmployee };
    fs.writeFileSync(filePath, `module.exports = ${JSON.stringify(employees, null, 2)};`);
    res.redirect('/employees/view');
  } else {
    res.status(404).send('Employee not found.');
  }
});



// Delete an employee
router.delete('/:id', (req, res) => {

  const index = employees.findIndex(emp => emp.id == req.params.id);
  if (index !== -1) {
    employees.splice(index, 1);

    fs.writeFileSync(filePath, `module.exports = ${JSON.stringify(employees, null, 2)};`);
    res.redirect('/employees/view'); // Redirect to the main employees page after deletion
  } else {
    res.status(404).send('Employee not found.');
  }
});


// Get a specific employee by ID
router.get('/:id', (req, res) => {
  try {
    const employee = employees.find(emp => emp && emp.id == req.params.id);
    if (employee) {
      res.json(employee);
    } else {
      throw new Error('Employee not found!');
    }
  } catch (err) {
    next(err); // Pass the error to error-handling middleware
  }
});



module.exports = router;