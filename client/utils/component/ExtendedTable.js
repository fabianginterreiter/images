"use strict"

import React from 'react'

class ExtendedTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      asc: props.asc
    };
  }

  handleClick(name) {
    this.setState({
      name: name,
      asc: this.state.name !== name || !this.state.asc
    }, () => this.props.order(this.state.name, this.state.asc));
  }

  _renderHead() {
    var elements = [];

    this.props.columns.forEach((column) => {
      if (column.name) {
        // <i class="fa fa-angle-down" aria-hidden="true" />
        //  <i className="fa fa-chevron-down" aria-hidden="true" />

        if (this.state.name === column.name) {
          if (this.state.asc) {
            elements.push(<th key={column.title} className={column.className} onClick={this.handleClick.bind(this, column.name)}>{column.title} <i className="fa fa-chevron-up" aria-hidden="true" /></th>);
          } else {
            elements.push(<th key={column.title} className={column.className} onClick={this.handleClick.bind(this, column.name)}>{column.title} <i className="fa fa-chevron-down" aria-hidden="true" /></th>);
          }

        } else {
          elements.push(<th key={column.title} className={column.className} onClick={this.handleClick.bind(this, column.name)}>{column.title} <i className="fa fa-angle-up" aria-hidden="true" /></th>);
        }

      } else {
        elements.push(<th key={column.title} className={column.className}>{column.title}</th>);
      }

    });

    return (<thead><tr>{elements}</tr></thead>);
  }

  render() {
    return (<table>
      {this._renderHead()}
      <tbody>
        {this.props.data.map((album) => this.props.render(album))}
      </tbody></table>)
  }
}

module.exports = ExtendedTable;
