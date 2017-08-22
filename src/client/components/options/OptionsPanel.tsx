import * as React from "react"
import * as $ from "jquery"
import ThumbnailsResizer from "../ThumbnailsResizer"
import { location } from "react-router"
import { Panel } from "../../utils/Utils"
import * as ReactRedux from "react-redux";
import {User} from "../../types/types"
import {deleteSession, setShowDate, closeOptionsPanel} from "../../actions"
import Ajax from "../../libs/Ajax";

interface OptionsPanelProps {
  session: User;
  showDate: boolean;
  open: boolean;
  deleteSession(): void;
  setShowDate(show: boolean): void;
  closeOptionsPanel(): void;
}

class OptionsPanel extends React.Component<OptionsPanelProps, {}> {
  constructor(props) {
    super(props);
  }



  private close(): void {
    this.props.closeOptionsPanel();
  }

  private deleteSession() {
    Ajax.delete("/api/session").then(() => (this.props.deleteSession()));
  }

  render() {
    return (
        <Panel open={this.props.open} clickCatcher={this.props.open} onClickCatcherClick={this.close.bind(this)} side="right" header={true} footer={true}>
          <div className="title" onClick={this.close.bind(this)}>
            Settings
            <span className="badge"><i className="fa fa-cog" /></span>
          </div>

          <div className="body">
            <ul className="options">
              <li><a>Size: <ThumbnailsResizer /></a></li>
              <li><a><label><input type="checkbox" checked={this.props.showDate} onChange={() => this.props.setShowDate(!this.props.showDate)} /> Show Dates</label></a></li>
            </ul>
          </div>

          <div className="footer">
            <div className="profile" onClick={this.deleteSession.bind(this)}><i className="fa fa-user"></i> {this.props.session.name}</div>
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteSession: () => dispatch(deleteSession()),
    setShowDate: (show: boolean) => dispatch(setShowDate(show)),
    closeOptionsPanel: () => dispatch(closeOptionsPanel())
  }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(OptionsPanel);
