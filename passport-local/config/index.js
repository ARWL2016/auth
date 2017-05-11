
if (process.env.NODE_ENV === 'production') {
  module.exports = {
    mlabURI: process.env.mlabURI, 
    sessionSecret: process.env.sessionSecret
  }
} else {
  module.exports = require('./development.json');
}
