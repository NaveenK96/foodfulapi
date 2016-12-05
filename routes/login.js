var mongoose = require('mongoose');
var passport = require('passport');

// Schema
var User = require('../models/user');

module.exports = function(router) {
  // Routes
  var loginRoute = router.route('/login');
	loginRoute.post(function(req, res){
		passport.authenticate('local', function(err, user, info) {
			var token;

			// If Passport throws/catches an error
			if (err){
				res.status(404);
				res.json({
					message: err,
					data: []
				});
			}else{
				// If user is found
				if (user){
					token = user.generateJwt();
					res.status(200);
					res.json({
						'token': token,
						message: 'Authentication Successful',
						data: user
					});
				}else{
					// If user is not found
					res.status(404);
					res.json({
						message : 'Authentication Failed. User not found.',
						data: []
					});
				}
			}
		})(req, res);
	});

  return router;
};