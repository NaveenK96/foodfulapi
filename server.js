// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var Task = require('./models/task');
var User = require('./models/user');
var bodyParser = require('body-parser');

var router = express.Router();

// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost/mp3');


// Create our Express application
var app = express();

// Use environment defined port or 3000
var port = process.env.PORT || 4000;


var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
};

app.use(allowCrossDomain);

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Initial dummy route for testing
// http://localhost:3000/api
// router.get('/', function(req, res) {
//   res.json({ message: 'Hello World!' });
// });

// Register all our routes with /api
app.use('/api', router);

var usersRoute = router.route('/users');

usersRoute.post(function(req, res) {
  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;
  user.tasks = [];

  user.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'User added to the database!', data: user });
  });
});

usersRoute.get(function(req, res) {

  console.log(req.query.where);
  var where = eval("("+req.query.where+")");
  var sort = eval("("+req.query.sort+")");
  var select = eval("("+req.query.select+")");
  var skip = eval("("+req.query.skip+")");
  var limit = eval("("+req.query.limit+")");

  console.log(where);

  User
  .find(where)
  .sort(sort)
  .select(select)
  .skip(skip)
  .limit(limit)
  .exec(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
});

var userRoute = router.route('/users/:user_id');

userRoute.get(function(req, res) {
  User.findById(req.params.user_id, function(err, user) {
    if (err)
      res.send(err);

    res.json(user);
  });
});

userRoute.delete(function(req, res) {
  User.findByIdAndRemove(req.params.user_id, function(err) {
    if (err)
      res.send(err);
    res.json({ message: 'User deleted from the database!' });
  });
});



var tasksRoute = router.route('/tasks');

tasksRoute.post(function(req, res) {
  var task = new Task();

  task.name = req.body.name;
  task.deadline = req.body.deadline;
  task.description = req.body.description;
  task.completed = req.body.completed;
  

  task.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Task added to the database!', data: task });
  });
});

tasksRoute.get(function(req, res) {
	//console.log (req.query.where);

	//http://stackoverflow.com/questions/13718326/javascript-string-to-object
	//var filter =  JSON.parse(req.query.where);

	var where = eval("("+req.query.where+")");
  var sort = eval("("+req.query.sort+")");
  var select = eval("("+req.query.select+")");
  var skip = eval("("+req.query.skip+")");
  var limit = eval("("+req.query.limit+")");

  Task
  .find(where)
  .sort(sort)
  .select(select)
  .skip(skip)
  .limit(limit)
  .exec(function(err, tasks) {
    if (err)
      res.send(err);

    res.json(tasks);
  });



});

var taskRoute = router.route('/tasks/:task_id');

taskRoute.get(function(req, res) {
  Task.findById(req.params.task_id, function(err, task) {
    if (err)
      res.send(err);

    res.json(task);
  });
});

taskRoute.delete(function(req, res) {
  Task.findByIdAndRemove(req.params.task_id, function(err) {
    if (err)
      res.send(err);
    res.json({ message: 'Task deleted from the database!' });
  });
});


// Start the server
app.listen(port);
console.log('Server running on port ' + port); 