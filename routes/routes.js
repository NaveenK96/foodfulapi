module.exports = function(app){

// Create our Express router
var router = express.Router();


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
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
});

var userRoute = router.route('/user/:user_id');

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
  console.log (req.query.where);

  //http://stackoverflow.com/questions/13718326/javascript-string-to-object
  //var filter =  JSON.parse(req.query.where);
  var filter = eval("("+req.query.where+")")

 // Task.find({"completed": true}, function(err, tasks) {
  Task.find(filter, function(err, tasks) {
    if (err)
      res.send(err);

    res.json(tasks);
  });
});

var taskRoute = router.route('/task/:task_id');

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


}