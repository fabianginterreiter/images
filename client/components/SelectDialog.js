var React = require('react');

var SelectDialogStore = require('../stores/SelectDialogStore');

class Dialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options:{},
      filter:''
    };
  }

  componentDidMount() {
    SelectDialogStore.addChangeListener(this, (options) => (this.setState({options:options})));
  }

  componentWillUnmount() {
    SelectDialogStore.removeChangeListener(this);    
  }

  handleCancel() {
    this.state.options.resolve(false);
    SelectDialogStore.setObject({});
  }

  handleOk() {
    this.state.options.resolve(true);
    SelectDialogStore.setObject({});
  }

  handleClickOnCheckbox(option) {
    option.marked = false;
    option.selected = !option.selected;
    this.setState({
      options:this.state.options
    });
  }

  handleChangeOnFilter(event) {
    this.setState({
      filter:event.target.value
    });
  }

  _renderOptions() {
    var options = [];
    this.state.options.options.forEach((option) => {
      if (!option.name.toUpperCase().startsWith(this.state.filter.toUpperCase())) {
        return;
      }

      if (!option.selected) {
        option.selected = false;
      }

      var className = (option.marked && !option.selected) ? 'marked' : '';
      options.push(<div key={option.id} className={className}><label><input type="checkbox" onChange={this.handleClickOnCheckbox.bind(this, option)} checked={option.selected} /> {option.name}</label></div>);
    });
    return options;
  }

  render() {
    if (!this.state.options.open) {
      return (<span />);
    }

    return (
      <div>
        <div className="dimming" onClick={this.handleCancel.bind(this)} />
        <div className="dialog">
          <div className="title">{this.state.options.title}</div>
          <div className="body">
            <input type="text" value={this.state.filter} onChange={this.handleChangeOnFilter.bind(this)} placeholder="Filter" />
            {this._renderOptions()}
          </div>
          <div className="bottom">
            <button onClick={this.handleOk.bind(this)}>OK</button>
            <button onClick={this.handleCancel.bind(this)}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Dialog;