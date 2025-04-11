const express = require('express');
const router = express.Router();

//Import the fs module
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/departments.js');


//import data
const employees = require('../data/employees');
const departments = require('../data/departments');
const roles = require('../data/roles');

// Get all departments
router.get('/', (req, res) => {
  res.json(departments);
});

// Get a specific department by ID
router.get('/:id', (req, res) => {
  const department = departments.find(dep => dep.id == req.params.id);
  if (department) {
    res.json(department);
  } else {
    res.status(404).send('Department not found');
  }
});

// Add a new department
router.post('/', (req, res) => {
  const newDepartment = req.body;

  if (!newDepartment || !newDepartment.id || !newDepartment.name) {
    return res.status(400).send('Invalid data received: A department must have an ID and name.');
  }

  if (departments.some(dep => dep.id == newDepartment.id)) {
    return res.status(400).send('Department ID must be unique.');
  }

  departments.push(newDepartment);

  // Write the updated data to the file
  fs.writeFileSync( filePath ,`module.exports = ${JSON.stringify(departments, null, 2)};`);

  res.status(201).json(newDepartment);
});

// Update a department
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updatedDepartment = req.body;

  if (!updatedDepartment || !updatedDepartment.name) {
    return res.status(400).send('Invalid data received: Department must have a name.');
  }
  
  const index = departments.findIndex(dep => dep && dep.id == id);
  if (index !== -1) {

    if (departments.some(dep => dep.id == updatedDepartment.id && dep.id != id)) {
      return res.status(400).send('Department ID must be unique.');
    }

    departments[index] = updatedDepartment;
   
  // Write the updated data to the file
  fs.writeFileSync( filePath ,`module.exports = ${JSON.stringify(departments, null, 2)};`);
    
    res.json(updatedDepartment);
  } else {
    res.status(404).send('Department not found');
  }
});

// Delete a department
router.delete('/:id', (req, res) => {
  const index = departments.findIndex(dep => dep && dep.id == req.params.id);
  if (index !== -1) {
    departments.splice(index, 1);

  // Filter out null values to clean the array
  const cleanedDepartments = departments.filter(dep => dep !== null);
  
  // Write the updated data to the file  
fs.writeFileSync(filePath, `module.exports = ${JSON.stringify(cleanedDepartments, null, 2)};`);
    res.status(204).send();
  } else {
    res.status(404).send('Department not found');
  }
});

module.exports = router;