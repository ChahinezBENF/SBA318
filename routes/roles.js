const express = require('express');
const router = express.Router();

//import data
const employees = require('../data/employees');
const departments = require('../data/departments');
const roles = require('../data/roles');

//Import the fs module
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/roles.js');

// Get all roles
router.get('/', (req, res) => {
  res.json(roles);
});

// Get a specific role by ID
router.get('/:id', (req, res) => {
  const role = roles.find(role => role.id == req.params.id);
  if (role) {
    res.json(role);
  } else {
    res.status(404).send('Role not found');
  }
});

// Add a new role
router.post('/', (req, res) => {
  const newRole = req.body;

  // Validate incoming data
  if (!newRole || !newRole.id || !newRole.name) {
    return res.status(400).send('Invalid data received: A role must have an ID and name.');
  }

  // Check for duplicate ID
  if (roles.some(role => role.id == newRole.id)) {
    return res.status(400).send('Role ID must be unique.');
  }

  roles.push(newRole);

  // Write the updated data to the file
  fs.writeFileSync(filePath, `module.exports = ${JSON.stringify(roles, null, 2)};`);

  res.status(201).json(newRole);
});

// Update a role
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updatedRole = req.body;

  // Validate incoming data
  if (!updatedRole || !updatedRole.name) {
    return res.status(400).send('Invalid data received: A role must have a name.');
  }

  const index = roles.findIndex(role => role && role.id == id);
  if (index !== -1) {

    // Ensure the updated ID doesn't conflict with other existing IDs
    if (roles.some(role => role.id == updatedRole.id && role.id != id)) {
      return res.status(400).send('Role ID must be unique.');
    }

    roles[index] = updatedRole;

    // Write the updated data to the file
    fs.writeFileSync(filePath, `module.exports = ${JSON.stringify(roles, null, 2)};`);

    res.json(updatedRole);
  } else {
    res.status(404).send('Role not found');
  }
});

// Delete a role
router.delete('/:id', (req, res) => {
  const index = roles.findIndex(role => role && role.id == req.params.id);
  if (index !== -1) {
    roles.splice(index, 1);

    // Filter out null values to clean the array
    const cleanedRoles = roles.filter(role => role !== null);

    // Write the updated data to the file
    fs.writeFileSync(filePath, `module.exports = ${JSON.stringify(cleanedRoles, null, 2)};`);

    res.status(204).send();
  } else {
    res.status(404).send('Role not found');
  }
});

module.exports = router;