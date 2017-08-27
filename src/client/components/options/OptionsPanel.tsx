import * as React from "react";
import * as ReactRedux from "react-redux";
import { location } from "react-router";
import {closeOptionsPanel, deleteSession, setShowDate} from "../../actions";
import Ajax from "../../libs/Ajax";
import {User} from "../../types/types";
import { Panel } from "../../utils/Utils";
import ThumbnailsResizer from "../ThumbnailsResizer";

interface OptionsPanelProps {
  session: User;
  showDate: boolean;
  open: boolean;
  deleteSession(): void;
  setShowDate(show: boolean): void;
  closeOptionsPanel(): void;
}

class OptionsPanel extends React.Component<OptionsPanelProps, {}> {
  public render() {
    return (
        <Panel open={this.props.open} clickCatcher={this.props.open}
          onClickCatcherClick={this.props.closeOptionsPanel.bind(this)}
          side="right" header={true} footer={true}>
          <div className="title" onClick={this.props.closeOptionsPanel.bind(this)}>
            Settings
            <span className="badge"><i className="fa fa-cog" /></span>
          </div>

          <div className="body">
            <ul className="options">
              <li><a>Size: <ThumbnailsResizer /></a></li>
              <li><a><label><input type="checkbox" checked={this.props.showDate}
              onChange={() => this.props.setShowDate(!this.props.showDate)} /> Show Dates</label></a></li>
            </ul>
          </div>

          <div className="footer">
            <div className="profile" onClick={this.props.deleteSession.bind(this)}>
              <i className="fa fa-user"></i> {this.props.session.name}
            </div>
          </div>
        </Panel>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    session: state.session,
    showDate: state.options.showDate,
    open: state.view.optionsPanelOpen
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteSession: () => dispatch(deleteSession()),
    setShowDate: (show: boolean) => dispatch(setShowDate(show)),
    closeOptionsPanel: () => dispatch(closeOptionsPanel())
  };
};

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(OptionsPanel);
