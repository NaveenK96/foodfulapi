var credentials = require('../config/credentials');
var jwt = require('express-jwt');
var mongoose = require('mongoose');
// Schema
var User = require('../models/user');


var auth = jwt({
  secret: credentials.secret_key,
  userProperty: 'payload'
});

module.exports = function(router) {
	var profileRoute = router.route('/profile');
	var profileIDRoute = router.route('/profile/:id'); // All requires authentication
	var profileIDFavoriteRoute = router.route('/profile/:id/favorite')


	/* GET profile/:id */
	profileIDRoute.get(function(req, res){
		if (!isIdValid(req.params.id)){
			res.status(404);
			res.json({
				message: 'Invalid User',
				data: []
			});
		}else{
			User.findById(req.params.id, function(err, user){
				if (err) {
					res.status(500);
					res.json({
						message: 'User is not found',
						data: []
					});
				}else{
					res.status(200);
					res.json({
						message: 'OK',
						data: user
					});
				}
			})
		}
	});

	/* Allows People to edit public profile such as rating */
	/*profileIDRoute.put(function(req, res) {
		var query = User.findById(req.params.id);
		var num_ratings = req.body.num_ratings;
		var rating = 0;
		for (var i  = 0; i < num_ratings.length; i++){
			rating += num_ratings[i];
		}
		// get new rating
		rating = rating / num_ratings.length;

		if(num_rating) {
			query = query.where('num_rating').update(num_rating)
		}

		if (rating) {
			query = query.where('rating').update(rating);
		}

		query.exec(function(err, user) {
			if (err){
				res.status(500);
				res.json({
					message: err,
					data: []
				})
			}else{
			res.status(200);
				res.json({
					message: 'Successfully edited!',
					data: user
				});
			}
		});
	})*/

	/* GET private profile/ */
	profileRoute.get(auth, function(req, res){
		if (!req.payload._id){
			res.status(401);
			res.json({
				message: 'UnauthorizedError: private profile',
				data: []	
			});
		}else{
			User.findById(req.payload._id, function(err, user){
				if (err){
					res.status(500);
					res.json({
						message: err,
						data: []
					});
				}else{
					res.status(200);
					res.json({
						message: 'Welcome to your profile!',
						data: user
					});
				}
			});
		}
	});

	/* Update Loggined User's favorite list */
	profileIDRoute.put(function(req, res){
	var query = User.findByIdAndUpdate(req.params.id, req.body, { new: true}, function(err, post){
		if (err){
			res.statusCode = 500;
			res.json(
			{ 
				message: err,
				data: []
			}); 
    }else{
      res.statusCode = 200;
      res.json(
      { 
        message: 'OK',
        data: post
      });
    };
  });
});
			
				//var typeID = req.body.typeID;
				/*var name = req.body.name;
				var email = req.body.email;
				var phone_number = req.body.phone_number;
				var favorites = req.body.favorites;
				var amount = req.body.amount;
				var address = req.body.address;
				var city = req.body.city;
				var state = req.body.state;
				var zipcode = req.body.zipcode;
				var location = req.body.loc;
				var description = req.body.description;
				var start_hour = req.body.start_hour;
				var start_minute = req.body.start_minute;
				var end_hour = req.body.end_hour;
				var end_minute = req.body.end_minute;
				var updated_date = Date.now;				

				if (name) {
					query = query.where('name').update(name);
				}

				if (email) {
					query = query.where('phone_number').update(phone_number);
				}

				if (favorites) {
					query = query.where('favorites').update(favorites);
				}

				if (amount) {
					query = query.where('amount').update(amount);
				}

				if (address) { 
					query = query.where('address').update(address);
				}
				
				if (city) {
					query = query.where('city').update(city);
				}

				if (state) {
					query = query.where('state').update(state);
				}

				if (zipcode) {
					query = query.where('zipcode').update(zipcode);
				}

				if (location) {
					query = query.where('location').update(loc);
				}

				if (description) { 
					query = query.where('description').update(description);
				}

				if(start_hour) {
					query = query.where('start_hour').update(start_hour);
				}

				if (start_minute) {
					query = query.where('start_minute').update(start_minute);
				}

				if (end_hour) {
					query = query.where('end_hour').update(end_hour);
				}

				if (end_minute) {
					query = query.where('end_minute').update(end_minute);
				}

				if (updated_date) {
					query = query.where('updated_date').update(updated_date);
				}

				query.exec(function(err, user) {
					if (err){
						res.status(500);
						res.json({
							message: err,
							data: []
						})
					}else{
				res.status(200);
					res.json({
						message: 'Successfully edited!',
						data: user
					});
				}
			});
		});*/

	/* PUT profile/ */
	/*profileRoute.put(auth, function(req, res){
		if (!req.payload._id){
			res.status(401);
			res.json({
				message: 'UnauthorizedError: private profile',
				data: []	
			});
		}else{
			var query = User.findByIdAndUpdate(req.payload._id, { new: true});
				//var typeID = req.body.typeID;
				var name = req.body.name;
				var email = req.body.email;
				var phone_number = req.body.phone_number;
				var favorites = req.body.favorites;
				var amount = req.body.amount;
				var address = req.body.address;
				var city = req.body.city;
				var state = req.body.city;
				var zipcode = req.body.city;
				var location = req.body.loc;
				var description = req.body.description;
				var start_hour = req.body.start_hour;
				var start_minute = req.body.start_minute;
				var end_hour = req.body.end_hour;
				var end_minute = req.body.end_minute;
				var updated_date = Date.now;				

				if (typeID) {
					query = query.where('typeID').update(typeID);
				}

				if (name) {
					query = query.where('name').update(name);
				}

				if (email) {
					query = query.where('phone_number').update(phone_number);
				}

				if (favorites) {
					query = query.where('favorites').update(favorites);
				}

				if (amount) {
					query = query.where('amount').update(amount);
				}

				if (address) { 
					query = query.where('address').update(address);
				}
				
				if (city) {
					query = query.where('city').update(city);
				}

				if (state) {
					query = query.where('state').update(state);
				}

				if (zipcode) {
					query = query.where('zipcode').update(zipcode);
				}

				if (location) {
					query = query.where('location').update(loc);
				}

				if (description) { 
					query = query.where('description').update(description);
				}

				if(start_hour) {
					query = query.where('start_hour').update(start_hour);
				}

				if (start_minute) {
					query = query.where('start_minute').update(start_minute);
				}

				if (end_hour) {
					query = query.where('end_hour').update(end_hour);
				}

				if (end_minute) {
					query = query.where('end_minute').update(end_minute);
				}

				if (updated_date) {
					query = query.where('updated_date').update(updated_date);
				}

				query.exec(function(err, user) {
					if (err){
						res.status(500);
						res.json({
							message: err,
							data: []
						})
					}else{
				res.status(200);
					res.json({
						message: 'Successfully edited!',
						data: user
					});
				}
			});
		}
	});*/


	/* DELETE profile/:id */
	profileRoute.delete(auth, function(req, res){
		if (!req.payload._id){
			res.status(401);
			res.json({
				message: 'UnauthorizedError: private profile',
				data: []	
			});
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

var isIdValid = function(id){
  return mongoose.Types.ObjectId.isValid(id);
}