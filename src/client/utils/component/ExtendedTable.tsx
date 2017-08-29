import * as React from "react";

interface ExtendedTableColumn {
  name?: string;
  title: string;
  className?: string;
}

interface ExtendedTableProps<T> {
  name: string;
  asc: boolean;
  columns: ExtendedTableColumn[];
  data: T[];
  order(name: string, asc: boolean): void;
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
      asc: props.asc,
      name: props.name
    };
  }

  public render() {
    return (<table>
      {this._renderHead()}
      <tbody>
        {this.props.data.map((album) => this.props.render(album))}
      </tbody></table>);
  }

  private handleClick(name) {
    this.setState({
      asc: this.state.name !== name || !this.state.asc,
      name
    }, () => this.props.order(this.state.name, this.state.asc));
  }

  private _renderHead() {
    const elements = [];

    this.props.columns.forEach((column) => {
      if (column.name) {
        if (this.state.name === column.name) {
          if (this.state.asc) {
            elements.push(<th key={column.title} className={"sort " + column.className}
              onClick={this.handleClick.bind(this, column.name)}>
              {column.title} <i className="fa fa-chevron-up" aria-hidden="true" />
            </th>);
          } else {
            elements.push(<th key={column.title} className={"sort " + column.className}
              onClick={this.handleClick.bind(this, column.name)}>
                {column.title} <i className="fa fa-chevron-down" aria-hidden="true" />
            </th>);
          }

        } else {
          elements.push(<th key={column.title} className={"sort " + column.className}
            onClick={this.handleClick.bind(this, column.name)}>
               {column.title} <i className="fa fa-angle-up" aria-hidden="true" />
              </th>);
        }

      } else {
        elements.push(<th key={column.title} className={column.className}>{column.title}</th>);
      }

    });

    return (<thead><tr>{elements}</tr></thead>);
  }
}
