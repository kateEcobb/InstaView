var routes = require('./constants/Constants').ServerRoutes;

var GetReq = function(route){
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: route,
      method: 'GET',
      contentType: 'application/json',
      success: function(data) {
        resolve(data);
      },
      error: function(xhr, status, err) {
        reject(err);
      }
    });
  });
};

var PostReq = function(route, photo){ 
  var data = {newPhoto: photo};
  $.ajax({ 
    url: route, 
    method: 'POST', 
    contentType: 'application/json', 
    data: JSON.stringify(data), 
    success: function(data){ 
      console.log('added photo to DB');
    }, 
    error: function(xhr, status, err){ 
      throw err;
    }
  });
};

module.exports = { 
  getPopularPhotos: function(){
    return GetReq(routes.EXPLORE);
  }, 

  getPhotosByTag: function(tag){ 
    return GetReq(routes.TAG + '?tagName='+ tag);
  }, 

  addPhoto: function(photo){ 
    return PostReq(routes.USER_ALBUM, photo);
  }
};
