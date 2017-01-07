var React = require('react');

const ImagesStore = require('../stores/ImagesStore');
const SelectionStore = require('../stores/SelectionStore');

class SelectAll extends React.Component {
  handleSelectAll() {
    ImagesStore.getObject().forEach((image) => (SelectionStore.select(image)));
    ImagesStore.dispatch();
  }

  handleUnselectAll() {
    ImagesStore.getObject().forEach((image) => (SelectionStore.unselect(image)));
    ImagesStore.dispatch(); 
  }

  render() {
    return (
      <span>
        <button onClick={this.handleSelectAll.bind(this)}><i className="fa fa-check-square-o" /><span className="min500"> Select All</span></button>
        <button onClick={this.handleUnselectAll.bind(this)}><i className="fa fa-square-o" /><span className="min500"> Unselect All</span></button>
      </span>
    );
  }
}

module.exports = SelectAll;