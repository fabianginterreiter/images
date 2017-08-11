import * as React from 'react'
import SelectDialogStore from './SelectDialogStore'

class Dialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options:{},
      filter:'',
      match:false
    };
  }

  componentDidMount() {
    SelectDialogStore.addChangeListener(this, (options) => (this.setState({options:options})));
  }

  componentWillUnmount() {
    SelectDialogStore.removeChangeListener(this);
  }

  handleCancel() {
    this.state.options.reject(false);
    SelectDialogStore.setObject({});
  }

  handleOk() {
    this.state.options.resolve(this.state.options.options);
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
    var value = event.target.value;
    var match = false;

    if (value.length === 0) {
      match = true;
    } else {
      this.state.options.options.forEach((option) => {
        if (option.name.toUpperCase() === value.toUpperCase()) {
          match = true;
        }
      });
    }

    this.setState({
      filter:value,
      match:match
    });
  }

  handleCreate() {
    var options = this.state.options;

    options.options.push({
      selected:true,
      name:this.state.filter
    });

    this.setState({
      options:options,
      filter:'',
      match:false
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
      options.push(<div key={option.name} className={className}><label><input type="checkbox" onChange={this.handleClickOnCheckbox.bind(this, option)} checked={option.selected} /> {option.name}</label></div>);
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
            <div className="group">
              <input type="text" value={this.state.filter} onChange={this.handleChangeOnFilter.bind(this)} placeholder="Filter" />
              <button disabled={this.state.match} onClick={this.handleCreate.bind(this)} className='primary'>Create</button>
            </div>
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

export default Dialog;
