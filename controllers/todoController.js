var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var mongoose = require('mongoose'); //database

//connect to the database

mongoose.connect('mongodb://test:test@ds135537.mlab.com:35537/todo');
//create a scheme - this is like a blueprint

var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);

/*var itemOne = Todo({item: 'buy flowers'}).save(function(err){
  if (err) throw err;
  console.log('item saved');
});*/

//var data = [{item: 'get milk'}, {item: 'do homework'}, {item: 'walk dog'}]; don't need this anymore bc we will pull from database
module.exports = function(app){
  app.get('/todo', function(req,res){
    //get data from mongodb and pass it to the view
    //console.log("beginning get");
    Todo.find({}, function(err, data){
      if (err) throw err;
      res.render('todo', {todos: data});
    });
    //console.log('done.');

  });

  app.post('/todo', urlencodedParser, function(req,res){

    //get data from the view and add it to the mongodb
    var newTodo = Todo(req.body).save(function(err, data){
      if (err) throw err;
      res.json(data);
    })
    //data.push(req.body);
  });

  app.delete('/todo/:item', function(req,res){
    //delete the requested item from mongodb

    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if (err) throw err;
      res.json(data);
    });

  });
};
