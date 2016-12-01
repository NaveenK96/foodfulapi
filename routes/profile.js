var credentials = require('../config/credentials');
var jwt = require('express-jwt');
// Schema
var User = require('../models/user');


var auth = jwt({
  secret: credentials.secret_key,
  userProperty: 'payload'
});

module.exports = function(router) {
	var profileRoute = router.route('/profile');
	var profileIDRoute = router.route('/profile/:id');

	profileIDRoute.get(auth, function(req, res){
		if (!req.payload._id){
			res.status(401);
			res.json({
				message: 'UnauthorizedError: private profile',
				data: []	
			});
		}else if (!isIdValid(req.payload._id)){
			res.status(404);
			res.json({
				message: 'Profile not found.',
				data: []
			});
		}else{
			User.findById(req.payload._id, function(err, user){
				if (err){
					res.status(500);
					res.json({
						message: err,
						data: user
					});
				}else{
					res.status(200);
					res.json({
						message: 'Welcome to your profile!',
						data: []
					});
				}
			});
		}
	});


	return router;
}

var isIdValid = function(id){
  return mongoose.Types.ObjectId.isValid(id);
}