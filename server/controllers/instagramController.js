var request = require('request');

module.exports = {
  getExplore: function(req, res){
    var options = {
      url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token='+req.user.instagram.token,
      method: 'GET'
    };
    request(options, function(err, response, body){
      res.status(200).send(JSON.parse(body));
    });
  },

  getTag: function(req, res){
    var options = {
      url: 'https://api.instagram.com/v1/tags/'+req.query.tagName+'/media/recent?access_token=' + req.user.instagram.token,
      method: 'GET'
    };
    request(options, function(err, response, body){
      res.status(200).send(JSON.parse(body));
    });
  }

};
