/*
 * Connect all of your endpoints together here.
 */


module.exports = function (app, router) {
  app.use('/api', require('./home.js')(router));
  app.use('/api', require('./users.js')(router));
  app.use('/api', require('./login.js')(router));
  app.use('/api', require('./register.js')(router));
  app.use('/api', require('./profile.js')(router));
};