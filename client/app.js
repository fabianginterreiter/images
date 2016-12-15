var React = require('react');
var ReactDOM = require('react-dom');

var Images = require('./components/Images');

var Navigations = require('./components/Navigations');

var Uploader = require('./components/Uploader');
var DragAndDropUpload = require('./components/DragAndDropUpload');
var ImagesStore = require('./stores/ImagesStore');
var Header = require('./components/Header');

var UsersManagement = require('./components/UsersManagement');

var NavigationsState = require('./states/NavigationsState');
var UserState = require('./states/UserState');

class ImgApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
  }

  handleUserChange() {
    console.log("change of user!");

    this.setState({
      user: UserState.getUser()
    });
  }

  componentDidMount() {
    UserState.addChangeListener(this.handleUserChange.bind(this));
    NavigationsState.addChangeListener(this.handleNavigationChange.bind(this));

    console.log("mounting");

    fetch('/api/images').then(function(response) {
      return response.json();
    }).then(function(images) {
      ImagesStore.setObject(images);
    }.bind(this));
  }

  handleNavigationChange() {
    this.forceUpdate();
  }

  render() {
    if (!this.state.user) {
      return (<UsersManagement />);
    }

    var contentClass = 'content';
      
    if (NavigationsState.getObject().pinned) {
      contentClass += ' open';
    }
    
    return (
      <div>
        <Navigations />

        <div className={contentClass}>
          <Header />
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