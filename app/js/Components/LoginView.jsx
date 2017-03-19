var React = require('react');

var loginView = React.createClass({ 
  render: function(){ 
    return ( 
      <a href='/auth/instagram' className='btn btn-block btn-social btn-instagram'>
        <i className='fa fa-instagram'></i>Sign in with Instagram
      </a> 
    );
  }
});

module.exports = loginView;
