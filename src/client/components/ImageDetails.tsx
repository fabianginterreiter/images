import * as React from "react";
import {connect} from "react-redux";
import {setImageTitle} from "../actions";
import Ajax from "../libs/Ajax";
import {Image} from "../types";
import Images from "./Images";
import { Link } from "react-router";
import { Quickedit } from "../utils/Utils";
import * as moment from "moment";

class ImageDetails extends React.Component<{
  image: Image;
  setImageTitle(image: Image, title: string);
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
    return (<div className="details">
      {this.renderTitle()}
      <div>Filename: <span>{this.props.image.filename}</span></div>
      <div>Resolution: <span>{this.props.image.width}/{this.props.image.height}</span></div>
      <div>Date: <span><Link to={`/images/dates/${moment(this.props.image.date).format("YYYY/MM/DD")}`}>{moment(this.props.image.date).format("YYYY MMMM DD HH:mm:ss")}</Link></span></div>
    </div>);
  }

  private renderTitle() {
    if (this.state.edit) {
      return <Quickedit value={this.props.image.title} onCancel={() => this.setState({
        edit: false
      })} onChange={(value) => this.handleTitleChange(value)} />
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
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setImageTitle: (image: Image, title: string) => dispatch(setImageTitle(image, title))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageDetails);
