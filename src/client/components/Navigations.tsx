import * as React from "react"
import ImagesStore from "../stores/ImagesStore"
import NavigationsStore from "../stores/NavigationsStore"
import NavigationsState from "../states/NavigationsState"
import { OptionsList, Panel } from "../utils/Utils"
import UserState from "../states/UserState"
import { browserHistory } from "react-router"
import Title from "./Title"
import { Option } from "../utils/component/OptionsList";
interface NavigationsProps {
  location: {
    pathname: string;
  }
}

interface NavigationsState {
  query: string;
  values: Option[];
}

export default class Navigations extends React.Component<NavigationsProps, NavigationsState> {
  constructor(props) {
    super(props);
    this.state = {
      values: NavigationsStore.getObject(),
      query: ""
    }
  }

  componentDidMount() {
    NavigationsState.addChangeListener(this, function() {
      if (NavigationsState.getObject().open) {
        this.setState({
          query: ""
        });
      } else {
        this.forceUpdate();
      }
    }.bind(this));

    NavigationsStore.addChangeListener(this, (navigations) => this.setState({values:navigations}));
  }

  componentWillUnmount() {
    NavigationsState.removeChangeListener(this);
    NavigationsStore.removeChangeListener(this);
  }

  private handleClick(option) {
    browserHistory.push(option.link);

    NavigationsState.close();
  }

  private handleSearchChange(event) {
    this.setState({
      query: event.target.value
    });
  }

  private isSelected(option) {
    return this.props.location.pathname === option.link;
  }

  private handleChangeUser() {
    UserState.clear();
  }

  render() {
    var open = (NavigationsState.getObject().open || NavigationsState.getObject().pinned);

    var clickCatcher = (NavigationsState.getObject().open && !NavigationsState.getObject().pinned);

    var pinClass = null;
    if (NavigationsState.getObject().pinned) {
      pinClass = "fa fa-toggle-on";
    } else {
      pinClass = "fa fa-toggle-off";
    }

    return (
      <Panel open={open} clickCatcher={clickCatcher} onClickCatcherClick={NavigationsState.close.bind(NavigationsState)} side="left" header={true}>
        <div className="title">
          <span onClick={NavigationsState.close.bind(NavigationsState)}><Title /></span>
          <input type="text" onChange={this.handleSearchChange.bind(this)} value={this.state.query} placeholder="Filter" />
          <div className="badge min500" onClick={NavigationsState.pin.bind(NavigationsState)}><i className={pinClass} aria-hidden="true" /></div>
        </div>
        <div style={{clear:"both"}} />
        <div className="body">
          <OptionsList values={this.state.values}
            onClick={this.handleClick.bind(this)}
            selected={this.isSelected.bind(this)}
            query={this.state.query} />
        </div>
      </Panel>);
  }
}
