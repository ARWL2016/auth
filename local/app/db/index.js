'use strict'; 
const Chalk = require('chalk'); 

const mongoose = require('mongoose'); 

const dbURI = 'mongodb://localhost/auth-local'; 

mongoose.connect(dbURI); 

mongoose.connection.on('connected', () => {
  console.log(Chalk.green('mongoose connected to: ' + dbURI)); 
}); 

mongoose.connection.on('error', (err) => {
  console.log(Chalk.red('mongoose connection error: ' + error)); 
}); 

const UserSchema = new mongoose.Schema({
  username: {
    type: String, 
    required: true
  },  
  password: {
    type: String, 
    required: true
  }
}); 

// the Schema defines the data structure 
// the model is an object to interact with the db 
// model + schema + collection = here 'user' will become 'users'
const UserModel = mongoose.model('user', UserSchema); 

module.exports = {
  mongoose, 
  UserModel
}