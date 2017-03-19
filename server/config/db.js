var mongoose = require('mongoose');

var mongoURI = 'mongodb://localhost/InstaAlbum';
console.log("CONNECTED TO:", mongoURI);

mongoose.connect(mongoURI);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Mongodb connection open');
});

module.exports = db;
