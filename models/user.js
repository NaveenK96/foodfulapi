// Load required packages
var mongoose = require('mongoose');
var Task = require('./task');

// Define our beer schema
var UserSchema   = new mongoose.Schema({
  name: String,
  email: String,
  tasks: [Task]
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);