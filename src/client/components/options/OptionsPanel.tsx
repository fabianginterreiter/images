import * as React from "react"
import * as $ from "jquery"
import ThumbnailsResizer from "../ThumbnailsResizer"
import { location } from "react-router"
import { Panel } from "../../utils/Utils"
import OptionsStore from "../../stores/OptionsStore"
import * as ReactRedux from "react-redux";
import {User} from "../../types/types"
import {deleteSession, setShowDate} from "../../actions"
import Ajax from "../../libs/Ajax";

interface OptionsPanelProps {
  session: User;
  deleteSession(): void;
  setShowDate(show: boolean): void;
  showDate: boolean;
}

class OptionsPanel extends React.Component<OptionsPanelProps, {}> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    OptionsStore.addChangeListener(this, () => (this.forceUpdate()));
  }

  componentWillUnmount() {
    OptionsStore.removeChangeListener(this);
  }

  private close(): void {
    OptionsStore.setObject(false);
  }

  private deleteSession() {
    Ajax.delete("/api/session").then(() => (this.props.deleteSession()));
  }

  render() {
    return (
        <Panel open={OptionsStore.getObject()} clickCatcher={OptionsStore.getObject()} onClickCatcherClick={this.close.bind(this)} side="right" header={true} footer={true}>
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
    showDate: state.options.showDate
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteSession: () => dispatch(deleteSession()),
    setShowDate: (show: boolean) => dispatch(setShowDate(show))
  }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(OptionsPanel);
