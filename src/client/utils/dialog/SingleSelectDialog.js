"use strict"

import React from 'react'
import SingleSelectDialogStore from './SingleSelectDialogStore'

class Dialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options:{},
      filter:'',
      match:false
    };
  }

  componentDidMount() {
    SingleSelectDialogStore.addChangeListener(this, (options) => (this.setState({options:options})));
  }

  componentWillUnmount() {
    SingleSelectDialogStore.removeChangeListener(this);    
  }

  handleCancel() {
    this.state.options.reject(null);
    SingleSelectDialogStore.setObject({});
  }

  handleOk(option) {
    this.state.options.resolve(option);
    SingleSelectDialogStore.setObject({});
  }

  handleChangeOnFilter(event) {
    var value = event.target.value;
    var match = false;

    if (value.length === 0) {
      match = true;
    } else {
      this.state.options.options.forEach((option) => {
        if (option.name.toUpperCase() === value.toUpperCase()) {
          match = true;
        }
      });
    }

    this.setState({
      filter:value,
      match:match
    });
  }

  handleCreate() {
    this.handleOk({
      name:this.state.filter
    });
  }

  _renderOptions() {
    var options = [];
    this.state.options.options.forEach((option) => {
      if (!option.name.toUpperCase().startsWith(this.state.filter.toUpperCase())) {
        return;
      }

      if (option.selected) {
        return options.push(<li key={option.name}>{option.name}</li>)
      }

      var className = (option.marked) ? 'marked' : ''; // we mark images where a few are
      options.push(<li key={option.name} className={className} onClick={this.handleOk.bind(this, option)}>
        {option.name}
        </li>);
    });
    return (<ul>{options}</ul>);
  }

  render() {
    if (!this.state.options.open) {
      return (<span />);
    }

    return (
      <div>
        <div className="dimming" onClick={this.handleCancel.bind(this)} />
        <div className="dialog">
          <div className="title">{this.state.options.title}</div>
          <div className="body">
            <div>
              <input type="text" value={this.state.filter} onChange={this.handleChangeOnFilter.bind(this)} placeholder="Filter" />
              <button disabled={this.state.match} onClick={this.handleCreate.bind(this)}>Create</button>
            </div>
            {this._renderOptions()}
          </div>
          <div className="bottom">
            <button onClick={this.handleCancel.bind(this)}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Dialog;