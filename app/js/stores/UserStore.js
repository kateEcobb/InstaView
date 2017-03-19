var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../dispatcher/Dispatcher');
var ActionTypes = require('../constants/Constants').ActionTypes;

var CHANGE_EVENT = 'change';

var user = {
  id: null, 
  name: null, 
  token: null,
  photos: []
};

var UserStore = assign({}, EventEmitter.prototype, { 
  emitChange: function(){ 
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  setUser: function(user_data){ 
    user.id = user_data.instagram.id;
    user.token = user_data.instagram.token; 
    user.name = user_data.instagram.name;
  }, 
  setPhotos: function(user_data){ 
    user_data.photos.forEach(function(photo){ 
      user.photos.push(photo.url);
    });
  }, 
  getUser: function(){ 
    return user;
  }, 
  addToUserAlbum: function(photo, cb){ 
    for(var i=0; i<user.photos.length; i++){ 
      if(photo === user.photos[i]){ 
        cb(false);
        return;
      }

    }
    user.photos.push(photo);
    cb(true);
  }
});

UserStore.dispatchToken = Dispatcher.register(function (dispatch) {
  var action = dispatch.action;
  if (action.type === ActionTypes.USER_LOGIN) {
    UserStore.setUser(action.payload);
    UserStore.setPhotos(action.payload);
    UserStore.emitChange();
  }
  if(action.type === ActionTypes.PHOTO_ADDED){ 
    UserStore.emitChange();
  }
});

module.exports = UserStore;
