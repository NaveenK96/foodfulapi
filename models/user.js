var credentials = require('../config/credentials');

// Load required packages
var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

// Define our User Schema
/* TypeID */
/* 0 - Individual Donor
   1 - Restaurant Donor
   2 - Donatee
*/ 
var UserSchema = new mongoose.Schema({
  typeID: { type: Number, required: true },
  name: { type: String, required: true },
  hash: String,
  salt: String,
  description: {type: String },
  email: { type: String, uinique: true, required: true },
  phone_number: { type: Number, required: true },
  location: { type: [Number], index: '2dsphere', required: true }, // [Long, Lat], index important for proximity searches
  hour: { type: Date, required: true},
  amount: { type: Number, default: 0 }, 
  rating: { type: Number, default: 0 }, 
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },
})

//UserSchema.index({location: '2dsphere'});
// User authentication and security
// Set the password using salt and hash
UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
}

// Checks if password is valid
UserSchema.methods.validPassword = function(password){
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash == hash;
}

UserSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, credentials.secret_key);
}

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
