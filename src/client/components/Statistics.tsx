import * as React from "react";
import {connect} from "react-redux";
import {loadImagesWithOffset} from "../actions";
import Ajax from "../libs/Ajax";
import {Image} from "../types";
import Images from "./Images";
import {t} from "../libs/Translation";

class Statistics extends React.Component<{}, {
  statistics;
}> {
  constructor(props) {
    super(props);

    this.state = {
      statistics: null
    };
  }

  public componentDidMount() {
    Ajax.get("/api/statistics").then((statistics) => this.setState({
      statistics
    }));
  }

  public render() {
    if (!this.state.statistics) {
      return <span />;
    }

    return (
      <div>
        <h1><i className="fa fa-line-chart" aria-hidden="true" /> {t("statistics.title")}</h1>
        <p>{t("statistics.path")}: {this.state.statistics.path}</p>
        <p>{t("statistics.cache")}: {this.state.statistics.cache}</p>
        <p>{t("statistics.images.count")}: {this.state.statistics.images.count}</p>
        <p>{t("statistics.images.size")}: {(this.state.statistics.images.size / 1024 / 1024).toFixed(2)} MB</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
