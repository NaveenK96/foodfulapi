var mongoose = require('mongoose');

var User = require('../models/user');

module.exports = function(router) {
  // Routes
  var searchRoute = router.route('/search');

	searchRoute.post(function(req, res){
		var typeID = req.body.typeID;
		var lat = req.body.latitude;
		var long = req.body.longitude;
		var distance = req.body.distance;
		var rating = req.body.rating;


		var query = User.find({});

		if (distance){
			query = query.where('location').near(
			{ center: {type: 'Point', coordinates: [long, lat]},
			maxDistance: distance * 1609.34, spherical: true});
		}

		if (typeID) {
			query.where('typeID').equals(typeID);
		}

		if (rating) {
			query.where('rating').gte(rating);
		}

		query.exec(function(err, users){ 
			if (err){
				res.status(500);
				res.json({
					message: err,
					data: []
				});
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