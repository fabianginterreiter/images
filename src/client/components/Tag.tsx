import * as React from "react";
import {connect} from "react-redux";
import { browserHistory } from "react-router";
import {loadImages} from "../actions";
import Ajax from "../libs/Ajax";
import {t} from "../libs/Translation";
import {Image, Tag} from "../types";
import { DialogStore, Quickedit } from "../utils/Utils";
import Images from "./Images";
import ImagesNav from "./ImagesNav";

interface TagComponentProps {
  params: {
    id: number;
  };
  tag: Tag;
  images: Image[];
}

interface TagComponentState {
  edit: boolean;
}

class TagComponent extends React.Component<TagComponentProps, TagComponentState> {
  constructor(props) {
    super(props);

    this.state = {
      edit: false
    };
  }

  public render() {
    if (!this.props.tag) {
      return <span />;
    }

    return (
      <div>
        <h1>
          <i className="fa fa-tag" aria-hidden="true" /> {this.renderTitle()}
          <ImagesNav images={this.props.images}>
            <a onClick={this.handleEdit.bind(this)} className="primary">
              <i className="fa fa-pencil-square-o" /><span className="min500"> {t("tag.edit")}</span>
            </a>
            <a onClick={this.handleDelete.bind(this)} className="warning">
              <i className="fa fa-trash-o" /><span className="min500"> {t("tag.delete")}</span>
            </a>
          </ImagesNav>
        </h1>
        <Images images={this.props.images} />
      </div>
    );
  }

  private handleEdit() {
    this.setState({
      edit: true
    });
  }

  private handleChange(value: string) {
    if (this.props.tag.name === value) {
      this.setState({
        edit: false
      });
    } else {
      this.props.tag.name = value;
      Ajax.put("/api/tags/" + this.props.tag.id, this.props.tag).then((tag) => {
        this.setState({
          edit: false
        });
      });
    }
  }

  private renderTitle() {
    if (this.state.edit) {
      return (<Quickedit
        value={this.props.tag.name}
        onChange={this.handleChange.bind(this)}
        onCancel={() => this.setState({edit: false})} />);
    }

    return this.props.tag.name;
  }

  private handleDelete() {
    DialogStore.open(t("tag.deleteConfirm.title"), t("tag.deleteConfirm.message"))
    .then((result) => Ajax.delete("/api/tags/" + this.props.tag.id)).then(() => {
      browserHistory.push("/images");
    });
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    images: state.images,
    tag: state.tags.find((tag) => tag.id === parseInt(ownProps.params.id, 10))
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  dispatch(loadImages(`/api/images?tag=${ownProps.params.id}`));
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagComponent);
