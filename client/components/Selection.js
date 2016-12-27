"use strict"

const React = require('react');

const SelectionStore = require('../stores/SelectionStore');
const ImagesStore = require('../stores/ImagesStore');
const NavigationsState = require('../states/NavigationsState');

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
      <div className="selection">
        <div className="title" onClick={NavigationsState.open.bind(NavigationsState)}>
          <i className="icon-camera-retro"></i> Images
        </div>
        <div className="">
          {SelectionStore.size()}
          <span onClick={SelectionStore.clear.bind(SelectionStore)}>Clear</span>
          <span onClick={this.handleShow.bind(this)}>Show</span>
        </div>

        <nav>
          <ul className="right">
            <li className="btn"><ThumbnailsResizer /></li>
            <li onClick={this.handleClick.bind(this)} className="btn min500">
              <input type="file" name="images" multiple="multiple" id="fileSelect" style={{display:'none'}} onChange={this.handleFileSelect.bind(this)} />
              <i className="icon-upload" /> Upload
            </li>
            <Options params={this.props.params} />
          </ul>
        </nav>
      </div>
    );
  }
}

module.exports = Selection;