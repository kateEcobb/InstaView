var keyMirror = require('../../../node_modules/react/lib/keyMirror');

module.exports = { 
  ActionTypes: keyMirror({ 
    TAG_LOADED: null, 
    TOGGLE_MYPHOTOS: null, 
    USER_LOGIN: null, 
    USER_LOGIN_FAILURE: null, 
    EXPLORE_LOADED: null, 
    PHOTO_ADDED: null
  }), 

  ActionSources: keyMirror({
    VIEW_ACTION: null
  }), 

  ServerRoutes: { 
    USER_LOGIN: '/signin',
    USER_ALBUM: '/api/album', 
    EXPLORE: '/api/explore', 
    TAG: '/api/tag'
  },

};

