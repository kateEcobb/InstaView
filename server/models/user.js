var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({ 
  instagram: { 
    id: String, 
    token: String,
    name: String,
  }, 
  photos: [{
    url: String
  }]
});

module.exports = mongoose.model('User', userSchema);
