var assign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../dispatcher/Dispatcher');
var ActionTypes = require('../constants/Constants').ActionTypes;

var CHANGE_EVENT = 'change';

var photos = { 
  explore: [], 
  tag: []
};

var PhotoStore = assign({}, EventEmitter.prototype, { 
  emitChange: function(){ 
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  setExplore: function(data){
    data.data.forEach(function(image){ 
      if(image.type === "image"){ 
        photos.explore.push(image.images.standard_resolution.url);
      }
    });
  },
  getExplore: function(){ 
    return photos.explore;
  }, 
  setTag: function(data){ 
    if(photos.tag.length > 0){ 
      photos.tag = [];
    }
    data.data.forEach(function(image){ 
      if(image.type === "image"){ 
        photos.tag.push(image.images.standard_resolution.url);
      }
    });
  }, 
  getTag: function(){ 
    return photos.tag;
  } 
});

PhotoStore.dispatchToken = Dispatcher.register(function(dispatch){ 
  var action = dispatch.action; 
  if(action.type === ActionTypes.EXPLORE_LOADED){ 
    PhotoStore.setExplore(action.payload);
    PhotoStore.emitChange();    
  }
  if(action.type === ActionTypes.TAG_LOADED){ 
    PhotoStore.setTag(action.payload);
    PhotoStore.emitChange();    
  }
});

module.exports = PhotoStore;
