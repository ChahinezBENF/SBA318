const express = require("express");
const bodyParser = require("body-parser");


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

//Set up the View Engine ejs
app.set('view engine', 'ejs');

////////////////

app.get('/', (req, res) => {
    res.render('index', { title: 'My Express Server' });
  });
  
  

////////////////////
// 404 Middleware
app.use((req, res, next) => {
    next(error(404, "Resource Not Found"));
  });

app.listen(port, () => {
    console.log(`Server listening on port: ${port}.`);
  });