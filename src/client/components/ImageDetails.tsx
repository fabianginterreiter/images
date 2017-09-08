import * as moment from "moment";
import * as React from "react";
import {connect} from "react-redux";
import { Link } from "react-router";
import {deleteImage, like, setImageTitle, unlike} from "../actions";
import Ajax from "../libs/Ajax";
import {t} from "../libs/Translation";
import {Image} from "../types";
import { DialogStore, KeyUpListener, OptionsList, Panel, Quickedit, ResizeListener } from "../utils/Utils";
import AlbumsList from "./AlbumsList";
import Images from "./Images";
import PersonsList from "./PersonsList";
import TagsList from "./TagsList";

class ImageDetails extends React.Component<{
  image: Image;
  visible: boolean;
  handleClosePanel(): void;
  setImageTitle(image: Image, title: string);
  deleteImage(image: Image): void;
}, {
  edit: boolean;
}> {
  public constructor(props) {
    super(props);

    this.state = {
      edit: false
    };
  }

  public render() {
    return (<Panel open={this.props.visible} clickCatcher={this.props.visible}
        side="right" onClickCatcherClick={() => this.props.handleClosePanel()} header={true}>
        <div className="title">
        </div>
        <div className="body">

        <div className="details">
          {this.renderTitle()}
          <div>{t("image.filename")}: <span>{this.props.image.filename}</span></div>
          <div>{t("image.resolution")}: <span>{this.props.image.width}/{this.props.image.height}</span></div>
          <div>{t("image.date")}: <span><Link to={`/images/dates/${moment(this.props.image.date).format("YYYY/MM/DD")}`}>{moment(this.props.image.date).format("YYYY MMMM DD HH:mm:ss")}</Link></span></div>
          <div><a onClick={() => this.handeDelete()}><i className="fa fa-trash-o" /> {t("image.delete")}</a></div>
        </div>

        <TagsList image={this.props.image} />
        <PersonsList image={this.props.image} hideEmptyList={true} />
        <AlbumsList image={this.props.image} hideEmptyList={true} />
      </div>
      </Panel>);
  }

  private renderTitle() {
    if (this.state.edit) {
      return <Quickedit value={this.props.image.title} onCancel={() => this.setState({
        edit: false
      })} onChange={(value) => this.handleTitleChange(value)} />;
    }
    return <h3>{this.props.image.title} <span className="badge" onClick={() => this.setState({
      edit: true
    })}><i className="fa fa-pencil-square-o" /></span></h3>;
  }

  private handleTitleChange(value: string) {
    this.setState({
      edit: false
    });

    this.props.setImageTitle(this.props.image, value);
  }

  private handeDelete() {
    DialogStore.open(t("image.deleteConfirm.title"), t("image.deleteConfirm.message"))
      .then(() => this.props.deleteImage(this.props.image));
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteImage: (image: Image) => dispatch(deleteImage(image)),
    setImageTitle: (image: Image, title: string) => dispatch(setImageTitle(image, title))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageDetails);
