import * as React from "react";
import * as ReactRedux from "react-redux";
import { Link } from "react-router";
import {deleteTag, saveTag, sortTags} from "../actions";
import Ajax from "../libs/Ajax";
import {Tag} from "../types/types";
import { DialogStore, ExtendedTable, Quickedit, sort } from "../utils/Utils";

interface TagsProps {
  tags: Tag[];
  delete(tag: Tag);
  save(tag: Tag);
  sort(key: string, asc: boolean);
}

interface TagsComponentState {
  edit: number;
}

class Tags extends React.Component<TagsProps, TagsComponentState> {
  constructor(props) {
    super(props);

    this.state = {
      edit: 0
    };
  }

  public render() {
    return (<div className="settings">
      <h1><i className="fa fa-tags" aria-hidden="true" /> Tags</h1>

      <ExtendedTable columns={[
        {title: "Name", name: "name"},
        {title: "Images", name: "count", className: "option"},
        {title: "Edit", className: "option"},
        {title: "Delete", className: "option"}]} data={this.props.tags}
        render={this._renderRow.bind(this)}
        order={(name, asc) => this.props.sort.bind(name, asc)} name={"name"} asc={true} />

    </div>);
  }

  private handleEdit(tag: Tag): void {
    this.setState({
      edit: tag.id
    });
  }

  private handleChange(tag: Tag, value: string): void {
    this.setState({
      edit: 0
    });

    if (tag.name === value) {
      return this.forceUpdate();
    }

    tag.name = value;

    this.props.save(tag);
  }

  private handleCancel(tag: Tag): void {
    this.setState({
      edit: 0
    });
    this.forceUpdate();
  }

  private handleDelete(tag: Tag): void {
    DialogStore.open("Delete Tag", "Do you really want to delete the Tags?")
    .then((result) => this.props.delete(tag));
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
}

const mapStateToProps = (state) => {
  return {
    tags: state.tags
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    delete: (tag: Tag) => dispatch(deleteTag(tag)),
    save: (tag: Tag) => dispatch(saveTag(tag)),
    sort: (key: string, asc: boolean) => dispatch(sortTags(key, asc))
  };
};

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Tags);
