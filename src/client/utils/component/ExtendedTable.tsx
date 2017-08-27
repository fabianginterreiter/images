import * as React from "react";

interface ExtendedTableColumn {
  name?: string;
  title: string;
  className?: string;
}

interface ExtendedTableProps<T> {
  name: string;
  asc: boolean;
  order(name: string, asc: boolean): void;
  columns: ExtendedTableColumn[];
  data: T[];
  render(object: T);
}

interface ExtendedTableState {
  name: string;
  asc: boolean;
}

export default class ExtendedTable<T> extends React.Component<ExtendedTableProps<T>, ExtendedTableState> {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      asc: props.asc
    };
  }

  handleClick(name) {
    this.setState({
      name,
      asc: this.state.name !== name || !this.state.asc
    }, () => this.props.order(this.state.name, this.state.asc));
  }

  _renderHead() {
    let elements = [];

    this.props.columns.forEach((column) => {
      if (column.name) {
        if (this.state.name === column.name) {
          if (this.state.asc) {
            elements.push(<th key={column.title} className={"sort " + column.className} onClick={this.handleClick.bind(this, column.name)}>{column.title} <i className="fa fa-chevron-up" aria-hidden="true" /></th>);
          } else {
            elements.push(<th key={column.title} className={"sort " + column.className} onClick={this.handleClick.bind(this, column.name)}>{column.title} <i className="fa fa-chevron-down" aria-hidden="true" /></th>);
          }

        } else {
          elements.push(<th key={column.title} className={"sort " + column.className} onClick={this.handleClick.bind(this, column.name)}>{column.title} <i className="fa fa-angle-up" aria-hidden="true" /></th>);
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
      </tbody></table>);
  }
}
