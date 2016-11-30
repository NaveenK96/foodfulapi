// Load required packages
var mongoose = require('mongoose');

// Define our Donator Schema
/*var DonatorSchema = new mongoose.Schema({
  type: { type: Number, required: true },
  hour: { type: Date},
  name: {type: String},
  email: {type: String},
  location: {type: Location}

});

//Define our Donatee Schema
var DonateeSchema = new mongoose.Schema({
  type: {type: Number},
  name: {type: String},


});*/

// Define our User Schema
var UserSchema = new mongoose.Schema({
  type: { type: Number, required: true },
  name: { type: String, required: true},
  description: {type: String },
  email: { type: String },
  phone_number: {type: Number, required: true },
  location: { type: [Number], index: '2dsphere', required: true }, // [Long, Lat], index important for proximity searches
  hour: { type: Date, required: true},
  amount: {type: Number, required: true},  
  created_date: { type: Date, default: Date.now() },
  updated_date: { type: Date, default: Date.now() },
})



// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
