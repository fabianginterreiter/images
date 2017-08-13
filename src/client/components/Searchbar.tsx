import * as React from 'react'
import { browserHistory } from 'react-router'
import NavigationsState from '../states/NavigationsState'
import Title from './Title'
import { KeyUpListener } from '../utils/Utils'

interface SearchbarProps {

}

interface SearchbarState {
  s: string;
  open: boolean;
}

export default class Searchbar extends React.Component<SearchbarProps, SearchbarState> {
  private opened: boolean;

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      s: ''
    }
  }

  componentDidMount() {
    KeyUpListener.addChangeListener(this, this.handleKeyUp.bind(this));
  }

  componentWillUnmount() {
    KeyUpListener.removeChangeListener(this);
  }

  handleKeyUp(event) {
    if (event.keyCode === 27) { //ESC
      this.setState({
        open:false
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    browserHistory.push(`/images/search?s=${(this.refs.search as HTMLFormElement).value}`);

    this.setState({
      open: false
    })
  }

  handleOpen() {
    this.setState({
      open: true
    });

    this.opened = true;
  }

  componentDidUpdate() {
    if (this.opened) {
      this.opened = false;
      (this.refs.search as HTMLFormElement).select();
    }
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  handleClickcatcherClick() {
    this.setState({
      open: false
    });
  }

  handleChange(e) {
    this.setState({
      s: e.target.value
    });
  }

  renderBar() {
    if (!this.state.open) {
      return null;
    }

    return (
      <div>
        <div className="click" onClick={this.handleClickcatcherClick.bind(this)} />
        <header className="searchbar">

          <nav>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <input type="text" ref="search" placeholder="Search" value={this.state.s} onChange={this.handleChange.bind(this)} />
            </form>
            <span className="right" onClick={this.handleClose.bind(this)}><i className="fa fa-times" /></span>
          </nav>
      </header>
    </div>);
  }

  render() {
    return (
      <a className="right">
        <span onClick={this.handleOpen.bind(this)}><i className="fa fa-search" /><span className="min500"> Search</span></span>
        {this.renderBar()}
      </a>
    );
  }
}
