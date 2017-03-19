var React = require('react');

//Stores ======
var PhotoStore = require('../stores/PhotoStore');
var UserStore = require('../stores/UserStore');

//View Actions ======
var ViewActions = require('../actions/ViewActions');

//Components =====
var PhotoContainer = require('./PhotoContainer.jsx');

var MainView = React.createClass({ 
  getInitialState: function(){ 
    return { 
      explore: null, 
      tag: null,
      current: null
    };
  },
  componentDidMount: function(){ 
    if(this.state.explore !== null){ 
      this.setState({current: PhotoStore.getExplore()});
      this.setState({explore: PhotoStore.getExplore()});
    }
    PhotoStore.addChangeListener(this.loadData);
  },

  componentWillUnmount: function(){ 
    PhotoStore.removeChangeListener(this.loadData);
  }, 

  loadData: function(){ 
    this.setState({explore: PhotoStore.getExplore()});
    this.setState({current: PhotoStore.getExplore()});

    if(PhotoStore.getTag().length > 0){ 
      this.setState({tag: PhotoStore.getTag()});
      this.setState({current: PhotoStore.getTag()});
    }
  },

  getTagPhotos: function(event){ 
    event.preventDefault();
    var searchInput = React.findDOMNode(this.refs.tag).value;
    if(searchInput[0] === '#'){ 
      searchInput = searchInput.slice(1);
    }
    ViewActions.loadTag(searchInput);
    React.findDOMNode(this.refs.tag).value = '';
  },

  goBack: function(){ 
    this.setState({current: this.state.explore});
  },

  render: function(){ 
    return ( 
      <div>
      <div className='row'>
       <div className="col-sm-4 col-sm-offset-4">
        <form className="input-group" onSubmit={this.getTagPhotos}>
          <input type="text" className="form-control" ref ='tag' placeholder="Search by Tag"/>
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Search</button>
          </span>
        </form>
      </div>
    </div>
      {this.state.current === this.state.explore ? (null) : (<div id='back' onClick={this.goBack}>Go Back</div>)}
        <p id='explain'>Click a photo to add it to your album!</p>
        <PhotoContainer canClick={true} photos={this.state.current} /> 
      </div>
      );
  }


});

module.exports = MainView;
