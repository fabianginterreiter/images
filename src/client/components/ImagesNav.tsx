import * as React from 'react'
import ImagesStore from '../stores/ImagesStore'
import SelectionStore from '../stores/SelectionStore'

export default class ImagesNav extends React.Component<{}, {}> {
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
      <nav className="group">
        <a onClick={this.handleSelectAll.bind(this)}><i className="fa fa-check-square-o" /><span className="min500"> Select All</span></a>
        <a onClick={this.handleUnselectAll.bind(this)}><i className="fa fa-square-o" /><span className="min500"> Unselect All</span></a>
        {this.props.children}
      </nav>
    );
  }
}
