import * as React from "react";
import { browserHistory } from "react-router";
import ImagesStore from "../stores/ImagesStore";
import NavigationsStore from "../stores/NavigationsStore";
import { Option } from "../utils/component/OptionsList";
import { OptionsList, Panel } from "../utils/Utils";
import Title from "./Title";
import * as ReactRedux from "react-redux";
import {openNavigation, closeNavigation, setPinNavigation} from "../actions";

interface NavigationsProps {
  location: {
    pathname: string;
  };
  open: boolean;
  pinned: boolean;
  closeNavigation(): void;
  setPinNavigation(pin: boolean): void;
}

interface NavigationsState {
  query: string;
  values: Option[];
}

class Navigations extends React.Component<NavigationsProps, NavigationsState> {
  constructor(props) {
    super(props);
    this.state = {
      values: NavigationsStore.getObject(),
      query: ""
    };
  }

  componentWillReceiveProps(props) {
    if (this.props.open) {
      this.setState({
        query: ""
      })
    }
  }

  private handleClick(option: Option) {
    browserHistory.push(option.link);

    this.props.closeNavigation();
  }

  private handleSearchChange(event) {
    this.setState({
      query: event.target.value
    });
  }

  private isSelected(option: Option) {
    return this.props.location.pathname === option.link;
  }

  render() {
    let open = (this.props.open || this.props.pinned);

    let clickCatcher = (this.props.open && !this.props.pinned);

    let pinClass = null;
    if (this.props.pinned) {
      pinClass = "fa fa-toggle-on";
    } else {
      pinClass = "fa fa-toggle-off";
    }

    return (
      <Panel open={open} clickCatcher={clickCatcher} onClickCatcherClick={() => this.props.closeNavigation()} side="left" header={true}>
        <div className="title">
          <span onClick={() => this.props.closeNavigation()}><Title /></span>
          <input type="text" onChange={this.handleSearchChange.bind(this)} value={this.state.query} placeholder="Filter" />
          <div className="badge min500" onClick={() => this.props.setPinNavigation(!this.props.pinned)}><i className={pinClass} aria-hidden="true" /></div>
        </div>
        <div style={{clear: "both"}} />
        <div className="body">
          <OptionsList values={this.state.values}
            onClick={this.handleClick.bind(this)}
            selected={this.isSelected.bind(this)}
            query={this.state.query} />
        </div>
      </Panel>);
  }
}

const mapStateToProps = (state) => {
  return {
    open: state.view.open,
    pinned: state.view.pinned
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openNavigation: () => dispatch(openNavigation()),
    closeNavigation: () => dispatch(closeNavigation()),
    setPinNavigation: (pin: boolean) => dispatch(setPinNavigation(pin))
  }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Navigations);
