const express = require("express");
const bodyParser = require("body-parser");


const app = express();
const port = 3000;

// Middleware to serve static files
app.use(express.static('public'));

//import routes
const employeeRoutes = require('./routes/employees');
const departmentRoutes = require('./routes/departments');
const roleRoutes = require('./routes/roles');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/employees', employeeRoutes);
app.use('/departments', departmentRoutes);
app.use('/roles', roleRoutes);



//Set up the View Engine ejs
app.set('view engine', 'ejs');


// Render homepage
app.get('/', (req, res) => {
    res.render('index', { title: 'CHAHINEZ Managment' });
  });
  

// 404 Middleware
app.use((req, res) => {
  res.status(404).send('Resource Not Found');
});

app.listen(port, () => {
    console.log(`Server listening on port: ${port}.`);
  });