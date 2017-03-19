var React = require('react');

// Routing ===========
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

// Material UI ========
var mui = require('material-ui');
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
var ThemeManager = require('material-ui/lib/styles/theme-manager');
var defTheme = require('material-ui/lib/styles/raw-themes/light-raw-theme');

//Components =========
var PhotoContainer = require('./Components/PhotoContainer.jsx');
var MainView = require('./Components/MainView.jsx');
var LoginView = require('./Components/LoginView.jsx');

//Flux ======
var ViewActions = require('./actions/ViewActions');
var ActionTypes = require('./constants/Constants');
var Dispatcher = require('./dispatcher/Dispatcher');

// utils =======
var auth = require('./auth');

//Stores ======
var UserStore = require('./stores/UserStore');

var App = React.createClass({ 
  mixins: [Router.Navigation, Router.State],

  getInitialState: function(){ 
    return { 
      loggedIn: false, 
      user: null, 
      toggled: false
    };
  },

  getChildContext: function(){
    return {
      muiTheme: ThemeManager.getMuiTheme(defTheme)
    };
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  
  componentWillUnmount: function(){
    Dispatcher.unregister(this.token);
    UserStore.removeChangeListener(this.successfulLogin);
  },

  componentDidMount: function(){ 
    auth.isLoggedIn();
    UserStore.addChangeListener(this.successfulLogin);
  },

  componentWillUpdate: function(){ 
    ViewActions.loadPopularPhotos();
  },

  successfulLogin: function(){ 
    this.setState({loggedIn: true});
    this.setState({user: UserStore.getUser()});
  }, 

  toggleState: function(){ 
    var stateChange = !this.state.toggled; 
    this.setState({toggled: stateChange});
  },

  render: function(){ 
    if(this.state.loggedIn){ 
      return ( 
      <div id='appContainer'>
        <h1 id='appTitle'>InstaAlbum</h1>
        <RouteHandler />
        {this.state.toggled ? 
          (<div id='profileContainer'>
            <h3>{this.state.user.name}'s Photos</h3>
            <div className='titles' onClick={this.toggleState}>Go Back</div> 
            <PhotoContainer canClick={false} photos={this.state.user.photos} />
           </div>)
         : (<div id='mainContainer'>
              <div className='titles' onClick={this.toggleState}>View Album</div>
              <MainView user={this.state.user} />
            </div>)}
      </div>
      );
    } else {
      return (
        <div id='appContainer'>
          <h1 id='appTitle'>InstaAlbum</h1>
          <RouteHandler />
          <LoginView />
        </div>
      );
    }
  }
});



var routes = (
  <Route name="app" path="/" handler={App}>
  </Route>
);

Router.run(routes, function(Root){
  React.render(<Root />, document.getElementById('AppView'));
});