// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var TaskSchema   = new mongoose.Schema({
  name: String,
  description: String,
  deadline: { type: Date, default: Date.now},
  completed: Boolean
});

// Export the Mongoose model
module.exports = mongoose.model('Task', TaskSchema);