var ActionTypes = require('./constants/Constants').ActionTypes;
var Dispatcher = require('./dispatcher/Dispatcher');

module.exports = { 
  isLoggedIn: function(){ 
    $.ajax({ 
      url: '/login', 
      method: 'GET', 
      contentType: 'application/json', 
      success: function(data){ 
        if(data){ 
          Dispatcher.handleViewAction({ 
            type: ActionTypes.USER_LOGIN, 
            payload: data
          });
        } else { 
          Dispatcher.handleViewAction({
            type: ActionTypes.USER_LOGIN_FAILURE,
            payload: data
          });
        }
      }
    });
  }
};
