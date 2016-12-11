var React = require('react');
var ReactDOM = require('react-dom');

var Images = require('./components/Images');
var Options = require('./components/Options');
var Navigations = require('./components/Navigations');
var ThumbnailsResizer = require('./components/ThumbnailsResizer');
var Upload = require('./components/Upload');
var Uploader = require('./components/Uploader');
var DragAndDropUpload = require('./components/DragAndDropUpload');
var ImagesStore = require('./stores/ImagesStore');

var NavigationsState = require('./states/NavigationsState');

class ImgApp extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    NavigationsState.addChangeListener(this.handleNavigationChange.bind(this));

    fetch('/api/images', {
      accept: 'application/json',
    }).then(function(response) {
      return response.json();
    }).then(function(images) {
      ImagesStore.setObject(images);
    }.bind(this));
  }

  handleNavigationChange() {
    this.forceUpdate();
  }

  render() {
    var contentStyle = {
    };
      
    if (NavigationsState.getObject().pinned) {
      contentStyle.paddingLeft = '300px';
    }
    
    return (
      <div>
        <Navigations />

        <div style={contentStyle} className="content">
          <header>
            <div className="title" onClick={NavigationsState.open.bind(NavigationsState)}>
              <i className="icon-camera-retro icon-large"></i> Images
            </div>

            <nav>
              <div className="navbar-right">
                <Options />
              </div>
              
              <div className="navbar-right min500">
                <Upload />
              </div>

              <div className="navbar-right">
                <ThumbnailsResizer />
              </div>
            </nav>
          </header>
          
          <Images />
        </div>

        <Uploader />
        <DragAndDropUpload />
      </div>
    );
  }
};

ReactDOM.render(
  <ImgApp />,
  document.getElementById('app')
);