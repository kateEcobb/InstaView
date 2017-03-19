var ActionTypes = require('../constants/Constants').ActionTypes;
var Dispatcher = require('../dispatcher/Dispatcher');
var UserStore = require('../stores/UserStore');
var util = require('../utils.js');


var ViewActions = {
  addToUserAlbum: function(photo){
    UserStore.addToUserAlbum(photo, function(){ 
      util.addPhoto(photo);
    }); 
    Dispatcher.handleViewAction({ 
     type: ActionTypes.PHOTO_ADDED, 
      payload: null
    });
  },

  loadPopularPhotos: function(){ 
    return util.getPopularPhotos()
    .then(function(data){ 
      Dispatcher.handleViewAction({ 
        type: ActionTypes.EXPLORE_LOADED, 
        payload: data
      });
    })
    .catch(function(err){ 
      throw err;
    });
  }, 

  loadTag: function(tag){ 
    return util.getPhotosByTag(tag)
    .then(function(data){ 
      Dispatcher.handleViewAction({ 
        type: ActionTypes.TAG_LOADED, 
        payload: data
      });
    })
    .catch(function(err){ 
      throw err;
    });
  }
};

module.exports = ViewActions;
