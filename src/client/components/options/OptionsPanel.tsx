import * as React from "react";
import * as ReactRedux from "react-redux";
import { location, Link } from "react-router";
import {closeOptionsPanel, deleteSession, setShowDate} from "../../actions";
import Ajax from "../../libs/Ajax";
import {User} from "../../types";
import { Panel } from "../../utils/Utils";
import ThumbnailsResizer from "../ThumbnailsResizer";
import {setLanguage, getLanguage, t} from "../../libs/Translation";

interface OptionsPanelProps {
  session: User;
  showDate: boolean;
  open: boolean;
  language: string;
  languages: string[];
  deleteSession(): void;
  setLanguage(language: string): void;
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
            {t("settings.title")}
            <span className="badge"><i className="fa fa-cog" /></span>
          </div>

          <div className="body">
            <ul className="options">
              <li><a>{t("settings.size")}: <ThumbnailsResizer /></a></li>
              <li><a><label><input type="checkbox" checked={this.props.showDate}
              onChange={() => this.props.setShowDate(!this.props.showDate)} /> {t("settings.showDates")}</label></a></li>
            </ul>

            <ul>
              {this.props.languages.map((language) => (<li key={language} onClick={() => this.props.setLanguage(language)}>
                {language === this.props.language ? <b>{t(`settings.languages.${language}`)}</b> : t(`settings.languages.${language}`)}
              </li>))}
            </ul>

            <Link to="/images/statistics"><i className="fa fa-line-chart" aria-hidden="true" /> Statistics</Link>
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
    languages: state.localizeReducer.languages,
    open: state.view.optionsPanelOpen,
    session: state.session,
    showDate: state.options.showDate,
    language: getLanguage(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeOptionsPanel: () => dispatch(closeOptionsPanel()),
    deleteSession: () => dispatch(deleteSession()),
    setLanguage: (language: string) => dispatch(setLanguage(language)),
    setShowDate: (show: boolean) => dispatch(setShowDate(show))
  };
};

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(OptionsPanel);
