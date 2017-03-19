var React = require('react');
var ViewActions = require('../actions/ViewActions');

//MuI ======
var SnackBar = require('material-ui/lib/snackbar');

var PhotoContainer = React.createClass({ 
  addToAlbum: function(event){ 
    if(this.props.canClick){ 
      var photo = event.target.src;
      ViewActions.addToUserAlbum(photo);
      this.refs.snackbar.show();
    }
  },
  
  render: function(){ 
    var context = this;
    if(!this.props.photos){ 
      return ( 
        <div className="spinner-container">
          <div className="spinner-loader">Loading…</div>
        </div>
        );
    } else {
    return ( 
      <div id="photoContainer">
      {this.props.photos.map(function(photo){ 
        return <img src={photo} onClick={context.addToAlbum} />
      })}
      <SnackBar
          ref='snackbar'
          message={'Photo Added to Album.'}
          autoHideDuration={2000} />
      </div>
      );
    }
  }

});

module.exports = PhotoContainer;
