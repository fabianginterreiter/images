import * as $ from "jquery";
import * as React from "react";
import { Link } from "react-router";
import Ajax from "../libs/Ajax";
import NavigationsStore from "../stores/NavigationsStore";
import {Tag} from "../types/types";
import { DialogStore, ExtendedTable, Quickedit, sort } from "../utils/Utils";

interface TagsComponentState {
  tags: Tag[];
  edit: number;
}

export default class Tags extends React.Component<{}, TagsComponentState> {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      edit: 0
    };
  }

  componentDidMount() {
    Ajax.get("/api/tags").then((tags) => this.setState({tags}));
  }

  componentWillUnmount() {
  }

  private handleEdit(tag: Tag): void {
    this.setState({
      edit: tag.id
    })
  }

  private handleChange(tag: Tag, value: string): void {
    this.setState({
      edit: 0
    })

    if (tag.name === value) {
      return this.forceUpdate();
    }

    tag.name = value;

    Ajax.put("/api/tags/" + tag.id, tag).then(() => {
      this.forceUpdate();
    });
  }

  private handleCancel(tag: Tag): void {
    this.setState({
      edit: 0
    })
    this.forceUpdate();
  }

  private handleDelete(tag: Tag): void {
    DialogStore.open("Delete Tag", "Do you really want to delete the Tags?")
    .then((result) => Ajax.delete("/api/tags/" + tag.id)).then(() => {
      for (let index = 0; index < this.state.tags.length; index++) {
        if (this.state.tags[index].id === tag.id) {
          this.state.tags.splice(index, 1);
          break;
        }
      }
      this.forceUpdate();
      NavigationsStore.load();
    });
  }

  private _renderText(tag: Tag) {
    if (tag.id === this.state.edit) {
      return (<Quickedit
        value={tag.name}
        onChange={(value) => this.handleChange(tag, value)}
        onCancel={() => this.handleCancel(tag)} />);
    }

    return (<Link to={`/images/tags/${tag.id}`}>{tag.name}</Link>);
  }

  private _renderRow(tag: Tag) {
    return (<tr key={tag.id}>
      <td>{this._renderText(tag)}</td>
      <td>{tag.count}</td>
      <td onClick={this.handleEdit.bind(this, tag)} className="option"><i className="fa fa-pencil-square-o" /></td>
      <td onClick={this.handleDelete.bind(this, tag)} className="option"><i className="fa fa-trash-o" /></td>
    </tr>);
  }

  private order(name: string, asc: boolean): void {
    sort(this.state.tags, name, asc).then((tags) => this.setState({
      tags
    }));
  }

  render() {
    return (<div className="settings">
      <h1><i className="fa fa-tags" aria-hidden="true" /> Tags</h1>

      <ExtendedTable columns={[
        {title: "Name", name: "name"},
        {title: "Images", name: "count", className: "option"},
        {title: "Edit", className: "option"},
        {title: "Delete", className: "option"}]} data={this.state.tags} render={this._renderRow.bind(this)} order={this.order.bind(this)} name={"name"} asc={true} />

    </div>);
  }
}
