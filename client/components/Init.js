var React = require('react');

var UserState = require('../states/UserState');

class Init extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initializing: true
    }
  }

  handleUserChange() {
    if (UserState.getUser()) {
      if (this.props.location.pathname.startsWith('/images')) {
        return;
      }

      var history = require('react-router').browserHistory;
      history.push('/images');
    } else {
      var history = require('react-router').browserHistory;
      history.push('/profiles');
    }
  }

  componentDidMount() {
    UserState.addChangeListener(this, this.handleUserChange.bind(this));

    UserState.load().then(function() {
      this.setState({
        initializing: false
      });
    }.bind(this));
  }

  componentWillUnmount() {
    UserState.removeChangeListener(this);
  }

  render() {
    if (this.state.initializing) {
      return (<span>Loading</span>);
    }

    if (this.props.location.pathname === '/') {
      this.handleUserChange();
    }

    return (
      <div>{this.props.children}</div>
    );
  }
}

module.exports = Init;