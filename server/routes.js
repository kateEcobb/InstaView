var instagramController = require('./controllers/instagramController');
var userController = require('./controllers/userController');

module.exports = function(app, passport){
  var isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    } else {
      res.redirect('/');
    }
  };

  app.get('/auth/instagram', passport.authenticate('instagram', {scope: ['public_content']}), function(req, res){});

  app.get('/auth/instagram/callback',
    passport.authenticate('instagram'), function(req, res){
      res.redirect('/');
    });

  app.get('/profile', isLoggedIn, function(req, res){
    res.status(200).send(req.user);
  });

  app.get('/home', isLoggedIn, function(req, res){
    res.status(200).send(req.user);
  });

  app.get('/login', function(req, res){
    if(req.isAuthenticated()){
      res.send(req.user);
    } else {
      res.send(null);
    }
  });

  app.get('/api/explore', isLoggedIn, instagramController.getExplore);
  app.get('/api/tag', isLoggedIn, instagramController.getTag);
  app.post('/api/album', isLoggedIn, userController.postPhoto);

};
