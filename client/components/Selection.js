var React = require('react');

var SelectionStore = require('../stores/SelectionStore');

class Dialog extends React.Component {
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

  render() {
    if (SelectionStore.isEmpty()) {
      return (<span />);
    }

    return (
      <div className="selection">
        {SelectionStore.size()}
      </div>
    );
  }
}

module.exports = Dialog;