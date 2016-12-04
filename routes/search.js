var mongoose = require('mongoose');

var User = require('../models/user');

module.exports = function(router) {
  // Routes
  var searchRoute = router.route('/search');

	searchRoute.post(function(req, res){
		var lat = req.body.latitude;
		var long = req.body.longitude;
		var distance = req.body.distance;

		var skipVar = 10;
		var limitVar = 10;
		var countVar = req.query.count;

		/*if (!count){
			User.find(where, {skip: skipVar, limit: limitVar}, function(err, users) {
				if (err){

				}else{

				}
			});
		}else{
			User.find()
		}
		*/

		var query = User.find({});

		if (distance){
			query = query.where('location').near(
			{ center: {type: 'Point', coordinates: [long, lat]},
			maxDistance: distance * 1609.34, spherical: true});
		}

		query.exec(function(err, users){ 
			if (err){

			}else{
				res.status(200);
				res.json({
					message: 'Found!',
					data: users
				});
			}
		});
	});

  return router;
};