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

// Get a specific employee by ID
router.get('/:id', (req, res) => {
  const employee = employees.find(emp => emp && emp.id == req.params.id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).send('Employee not found');
  }
});

// Add a new employee
router.post('/', (req, res) => {
  const newEmployee = req.body;

  // Validate incoming data
  if (!newEmployee || Object.keys(newEmployee).length === 0) {
    return res.status(400).send('Invalid data received');
  }

  // Check for duplicate ID
  if (employees.some(emp => emp.id == newEmployee.id)) {
    return res.status(400).send('Employee ID must be unique.');
  }


  employees.push(newEmployee);

  fs.writeFileSync(filePath,`module.exports = ${JSON.stringify(employees, null, 2)};`);

  res.status(201).json(newEmployee);
});

// Update an employee
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updatedEmployee = req.body;

   // Validate incoming data
   if (!updatedEmployee || !updatedEmployee.firstName || !updatedEmployee.lastName) {
    return res.status(400).send('Invalid data received: Employee must have a first name and last name.');
  }

  const index = employees.findIndex(emp => emp && emp.id == id);
  if (index !== -1) {

       // Ensure the updated ID doesn't conflict with other existing IDs
       if (employees.some(emp => emp.id == updatedEmployee.id && emp.id != id)) {
        return res.status(400).send('Employee ID must be unique.');
      }

    employees[index] = updatedEmployee;

   // Write the updated data to the file
    fs.writeFileSync( filePath, `module.exports = ${JSON.stringify(employees, null, 2)};` );

    res.json(updatedEmployee);
  } else {
    res.status(404).send('Employee not found');
  }
});

// Delete an employee
router.delete('/:id', (req, res) => {
  const index = employees.findIndex(emp => emp && emp.id == req.params.id); // Check if the employee exists and is not nul
  if (index !== -1) {
    employees.splice(index, 1);
    
     // Filter out null values to clean the array
     const filteredEmployees = employees.filter(emp => emp !== null);

      // Write the cleaned data back to the file
    fs.writeFileSync(  filePath, `module.exports = ${JSON.stringify(filteredEmployees, null, 2)};` );
    
    res.status(204).send();
  } else {
    res.status(404).send('Employee not found');
  }
});

module.exports = router;