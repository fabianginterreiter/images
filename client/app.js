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

class ImgApp extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetch('/api/images', {
      accept: 'application/json',
    }).then(function(response) {
      return response.json();
    }).then(function(images) {
      ImagesStore.setObject(images);
    }.bind(this));
  }

  render() {
    return (
      <div>
        <header>
          <div className="title">
            <Navigations />
          </div>

          <nav>
            <div className="navbar-left">
              <ThumbnailsResizer />
            </div>
            <div className="navbar-right">
              <Options />
            </div>
            
            <div className="navbar-right min500">
              <Upload />
            </div>
          </nav>
        </header>

        <div className="clear" />
        
        <Images />

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