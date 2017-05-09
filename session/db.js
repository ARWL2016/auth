'use strict'; 
const Chalk = require('chalk'); 

const mongoose = require('mongoose'); 

const dbURI = 'mongodb://localhost/session'; 

mongoose.connect(dbURI); 

mongoose.connection.on('connected', () => {
  console.log('Connected to: ' + dbURI); 
}); 

mongoose.connection.on('error', (err) => {
  console.log(Chalk.red('mongoose connection error: ' + err)); 
}); 

module.exports = {
  mongoose, 
}