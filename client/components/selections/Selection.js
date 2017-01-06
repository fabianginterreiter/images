"use strict"

const React = require('react');

const SelectionStore = require('../../stores/SelectionStore');
const ImagesStore = require('../../stores/ImagesStore');
const NavigationsState = require('../../states/NavigationsState');
const SelectionOptions = require('./SelectionOptions');
const history = require('react-router').browserHistory;
const Title = require('../Title');

class Selection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selection:{}};
  }

  componentDidMount() {
    SelectionStore.addChangeListener(this, (selection) => (this.setState({selection:selection})));
  }

  componentWillUnmount() {
    SelectionStore.removeChangeListener(this);    
  }

  handleShow() {
    history.push('/images/selected');
  }

  render() {
    if (SelectionStore.isEmpty()) {
      return (<span />);
    }

    return (
      <div className={'selection ' + this.props.className}>
        <div className="title" onClick={NavigationsState.open.bind(NavigationsState)}>
          <Title />
        </div>

        <nav>
          <ul className="left">
            <li className="info">{SelectionStore.size()} selected</li>
            <li className="btn" onClick={SelectionStore.clear.bind(SelectionStore)}><i className="fa fa-times" aria-hidden="true" /><span className="min500"> Clear</span></li>
            <li className="btn" onClick={this.handleShow.bind(this)}><i className="fa fa-television" aria-hidden="true" /> <span className="min500">Show</span></li>
          </ul>
          <ul className="right">
            <SelectionOptions params={this.props.params} />
          </ul>
        </nav>
      </div>
    );
  }
}

module.exports = Selection;