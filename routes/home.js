var credentials = require('../config/credentials');

module.exports = function(router) {

  var homeRoute = router.route('/');

  homeRoute.get(function(req, res) {
    connection_string = credentials.connection_string;
    res.json(
      { 
        message: 'Play with api',
        data: [] 
      }
    );
  });

  return router;
}

