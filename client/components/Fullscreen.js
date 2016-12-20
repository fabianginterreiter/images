var React = require('react');
var OptionsList = require('./OptionsList');
var AutoComplete = require('./AutoComplete');
const Like = require('./Like')
var ImagesStore = require('../stores/ImagesStore');
var $ = require("jquery");

var KeyUpListener = require('../stores/KeyUpListener');

class Fullscreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      menu: true
    };
  }

  componentDidMount() {
    KeyUpListener.addChangeListener(this, this.handleKeyUp.bind(this));
    $("body").css("overflow", "hidden");
    this._show();
  }

  componentWillUnmount() {
    KeyUpListener.removeChangeListener(this);    
    $("body").css("overflow", "auto");
    clearTimeout(this.timeout);
  }

  handleKeyUp(e) {
    switch (e.keyCode) {
      case 32: {
        this._show();
        ImagesStore.like(this.props.image);        
      }
    }
  }

  _hide() {
    if (this.state.menu) {
      return;
    }

    this.setState({
      show: false
    });
  }

  handleMouseMove() {
    this._show();
  }

  _show() {
    this.setState({
      show: true
    });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this._hide.bind(this), 1000);
  }

  handleClick(option) {
    switch (option.key) {
      case 'delete': {
        ImagesStore.delete(this.props.image);
        break;
      }
    }
  }

  toggleMenu() {
    if (this.state.menu) {
      this._hide();
      this.setState({
        menu: false
      });
    } else {
      this.setState({
        show: true,
        menu: true
      });
    }
  }
  
  handleAddTag(tag) {
    fetch('/api/images/' + this.props.image.id + '/tags', {
      method: "PUT",
      body: JSON.stringify(tag), 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((result) => result.json());
  }

  handleDeleteTag(tag) {
    fetch('/api/images/' + this.props.image.id + '/tags/' + tag.id, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  render() {
    var titleClass = 'title';

    if (this.state.show) {
      titleClass += ' show';
    }

    var opt = (<span />);

    if (this.state.menu) {
      var options = [{
        key: 'delete',
        type: 'action',
        name: 'Delete'
      }];

      opt = (
        <div className="opt">
          <OptionsList values={options} onClick={this.handleClick.bind(this)} />

          <AutoComplete service='/api/tags' onSelect={this.handleAddTag.bind(this)} />

          <h4>Tags</h4>
          <ul>
            {
              this.props.image.tags.map((tag, idx) => (<li key={tag.id}>{tag.name} <i className="icon-remove" onClick={this.handleDeleteTag.bind(this, tag)} /></li>))
            }
          </ul>
        </div>);
    }

    return (
      <div className="fullscreen" onMouseMove={this.handleMouseMove.bind(this)}>
        <img src={'/images/' + this.props.image.path} alt={this.props.image.filename} />
        <div className={titleClass}>
          <div onClick={this.props.handleClose} className="close">✕</div>
          {this.props.image.filename}
          <div className="options">
            <Like image={this.props.image} />
            <i className="icon-reorder" onClick={this.toggleMenu.bind(this)} />
          </div>
        </div>
        <div className="previous" onClick={this.props.previous} />
        <div className="next" onClick={this.props.next} />
        {opt}
      </div>
    );
  }
}

module.exports = Fullscreen;