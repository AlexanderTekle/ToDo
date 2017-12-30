var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

var data = [{item: 'get milk'}, {item: 'do homework'}, {item: 'walk dog'}];

module.exports = function(app){
  app.get('/todo', function(req,res){
    res.render('todo', {todos: data});
  });

  app.post('/todo', urlencodedParser, function(req,res){
    data.push(req.body);
    res.json(data);
  });

  app.delete('/todo', function(req,res){

  });
};
