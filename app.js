var express = require('express');
var todoController = require('./controllers/todoController');
var app = express();

//set up template engine for ejs
app.set('view engine', 'ejs');

//set up the static  files

app.use(express.static(__dirname));

//fire controller, pass the app as parameter so that it is available in the controller
todoController(app);

//ocalhost:300/styles.css

app.listen(3000);
