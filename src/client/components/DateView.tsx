import * as moment from "moment";
import * as React from "react";
import {connect} from "react-redux";
import {loadImages} from "../actions";
import {Image} from "../types";
import Images from "./Images";
import ImagesNav from "./ImagesNav";

interface DateViewProps {
  images: Image[];
  params: {
    year?: number;
    month?: number;
    day?: number;
  };
}

class DateView extends React.Component<DateViewProps, {}> {
  public render() {
    return (
      <div>
        <h1>
          <i className="fa fa-calendar" aria-hidden="true" /> {this.renderTitle()}
          <ImagesNav images={this.props.images} />
        </h1>
        <Images images={this.props.images} />
      </div>
    );
  }

  private renderTitle() {
    const date = moment().year(this.props.params.year);

    if (this.props.params.month) {
      date.month(this.props.params.month - 1);

      if (this.props.params.day) {
        date.date(this.props.params.day);
        return date.format("MMMM D. YYYY");
      }

      return date.format("MMMM YYYY");
    }

    return date.format("YYYY");
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    images: state.images
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let url = "/api/images";
  if (ownProps.params.year) {
    url += "?year=" + ownProps.params.year;

    if (ownProps.params.month) {
      url += "&month=" + ownProps.params.month;

      if (ownProps.params.day) {
        url += "&day=" + ownProps.params.day;
      }
    }
  }

  dispatch(loadImages(url));
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DateView);
