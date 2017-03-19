var User = require('../models/user');

module.exports = { 
  postPhoto: function(req, res){ 
    User.findOne({'instagram.id': req.user.instagram.id}, function(err, user){ 
      if (err) res.status(500).send("Error posting to DB");
      else { 
        user.photos.push({url: req.body.newPhoto});
        user.save(function(err){ 
          if(err) throw err;
          res.status(200).send("Photo successfully added.");
        });
      }
    });
  }
};
