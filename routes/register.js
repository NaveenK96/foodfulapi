var mongoose = require('mongoose');

var User = require('../models/user');

module.exports = function(router) {
  // Routes
  var registerRoute = router.route('/register');

  registerRoute.post(function(req, res){
    var new_user = new User();
    new_user.typeID = req.body.typeID;
    new_user.name = req.body.name;
    new_user.email = req.body.email;
    new_user.phone_number = req.body.phone_number;
    new_user.location = eval("("+req.body.location+")");
    new_user.hour = req.body.hour;

    new_user.setPassword(req.body.password);
    User.create(new_user, function (err, user) {
      if (err){
        res.status(500);
        res.json({
          message: err,
          data: []
        });
      }else{
        var token = user.generateJwt();
        res.status(200);
        res.json({
          'token' : token,
          message: 'User is successfully registered',
          data: user
        });
      }
    });
  });

  return router;
};