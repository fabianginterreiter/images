"use strict"

const React = require('react');

const SelectionStore = require('../stores/SelectionStore');
const ImagesStore = require('../stores/ImagesStore');
const NavigationsState = require('../states/NavigationsState');
const Options = require('../components/Options');

class Selection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selection:{}};
  }

  componentDidMount() {
    SelectionStore.addChangeListener(this, (selection) => (this.setState({selection:selection})));
  }

  componentWillUnmount() {
    SelectionStore.removeChangeListener(this);    
  }

  handleShow() {
    ImagesStore.setObject(SelectionStore.getSelected());
  }

  render() {
    if (SelectionStore.isEmpty()) {
      return (<span />);
    }

    return (
      <div className={'selection ' + this.props.className}>
        <div className="title" onClick={NavigationsState.open.bind(NavigationsState)}>
          <i className="icon-camera-retro"></i> Images
        </div>

        <nav>
          <ul className="left">
            <li className="btn">{SelectionStore.size()}</li>
            <li className="btn" onClick={SelectionStore.clear.bind(SelectionStore)}>Clear</li>
            <li className="btn" onClick={this.handleShow.bind(this)}>Show</li>
          </ul>
          <ul className="right">
            <Options params={this.props.params} />
          </ul>
        </nav>
      </div>
    );
  }
}

module.exports = Selection;