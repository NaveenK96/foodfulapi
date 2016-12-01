var User = require('../models/user');

module.exports = function(router) {
  // Routes
  var userRoute = router.route('/users');
  var userIdRoute = router.route('/users/:id');
  
  /* HTTP Methods */
  /* GET /users/ */
  userRoute.get(function(req, res) {
    //User.find()
    // TODO: implement this
    User.find(function(err, users){
      if (err){
        res.status(500);
        res.json({
          message: err,
          data: []
        });
      }else{
        res.status(200);
        res.json({
          message: 'Got em',
          data: users
        });
      }
    });
  });

  /* POST /users */
  userRoute.post(function(res, req) {
      User.create(req.body, function (err, user){
        if (err){
          res.statusCode = 500;
          res.json(
            { 
              message: err,
              data: user
            }
          );
        }else{
          res.statusCode = 201;
          res.json(
            { 
              message: 'User has been successfully created',
              data: user
            });
        }
      });
  });

  /* GET /users/id */
  userIdRoute.get(function(req, res) {
    User.findById(req.params.id, function (err, user) {
      if (err){
        res.statusCode = 500;
        res.json(
          {
            message: err,
            data: []
          }
        )
      }else if (!user){
        res.statusCode = 404;
        res.json(
          {
            message: 'User not found',
            data: []
          }
        )
      }else{
        res.statusCode = 200;
        res.json(
          {
            message: 'OK',
            data: user
          }
        )
      }
    })
  });

  /* PUT /users/id */
  userIdRoute.put(function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user){
      if (err){

      }else{
        res.statusCode = 200;
        res.json(
          {
            message: 'OK',
            data: user
          }
        )
      }
    });
  });

  /* DELETE /users/id */
  userIdRoute.delete(function(req, res) {
    if (!isIdValid(req.params.id)){
      res.statusCode = 404;
      res.json(
        { 
          message: 'User not found',
          data: []
        }
      );
    }else{
      User.findByIdAndRemove(req.params.id, req.body, function (err, post){
        if (err){
          res.statusCode = 500;
          res.json(
            { 
              message: err,
              data: post
            }
          );
        }else{
          res.statusCode = 200;
          res.json(
            { 
              message: 'User has been successfully deleted',
              data: []
            }
          );
        }
      });
    }
  }); 

  return router;
}

/* Checks if id is a valid 12byte objectID */
var isIdValid = function(id){
  return mongoose.Types.ObjectId.isValid(id);
}

