"use strict"

const React = require('react');
const OptionsList = require('./OptionsList');
const Like = require('./Like')
const Tags = require('./Tags')
const ImagesStore = require('../stores/ImagesStore');
const $ = require("jquery");
const KeyUpListener = require('../stores/KeyUpListener');

class Fullscreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      menu: false
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
    if (document.activeElement.tagName === 'INPUT') {
      return;
    }

    switch (e.keyCode) {
      case 32: {
        this._show();
        ImagesStore.like(this.props.image);
        break;
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

          <Tags image={this.props.image} />
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