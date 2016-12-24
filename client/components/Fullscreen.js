"use strict"

const React = require('react');
const OptionsList = require('./OptionsList');
const Like = require('./Like')
const Tags = require('./Tags')
const Persons = require('./Persons')
const ImagesStore = require('../stores/ImagesStore');
const $ = require("jquery");
const KeyUpListener = require('../stores/KeyUpListener');
const Panel = require('./Panel');
const DialogStore = require('../stores/DialogStore');
const Faces = require('./Faces')
const ResizeListener = require('../stores/ResizeListener');

class Fullscreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      menu: false,
      style: {}
    };
  }

  componentDidMount() {
    KeyUpListener.addChangeListener(this, this.handleKeyUp.bind(this));
    ResizeListener.addChangeListener(this, this.handleImageLoad.bind(this));
    $("body").css("overflow", "hidden");
    this._show();
  }

  componentWillUnmount() {
    KeyUpListener.removeChangeListener(this);
    ResizeListener.removeChangeListener(this);     
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
        

        DialogStore.open('Delete Image', 'Do you really want to delete the image?').then((result) => {
          if (result) {
            ImagesStore.delete(this.props.image);
          }
        });
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

  handleImageLoad() {
    let img = this.refs.image;
    this.setState({
      style: {
        width: img.width,
        height: img.height,
        left: img.offsetLeft
      }
    });
  };

  render() {
    var titleClass = 'title';

    if (this.state.show) {
      titleClass += ' show';
    }

    var options = [{
        key: 'delete',
        type: 'action',
        name: 'Delete'
      }];

    return (
      <div className="fullscreen" onMouseMove={this.handleMouseMove.bind(this)}>
        <img ref="image" src={'/images/' + this.props.image.path} alt={this.props.image.filename} onLoad={this.handleImageLoad.bind(this)} />
        <Faces style={this.state.style} image={this.props.image} show={this.state.show} />
        <div className={titleClass}>
          <div onClick={this.props.handleClose} className="close">✕</div>
          {this.props.image.filename} ({this.props.number}/{this.props.size})
          <div className="options">
            <Like image={this.props.image} />
            <i className="icon-reorder" onClick={this.toggleMenu.bind(this)} />
          </div>
        </div>
        <div className="previous" onClick={this.props.previous} />
        <div className="next" onClick={this.props.next} />
        <Panel open={this.state.menu} clickCatcher={this.state.menu} side='right' onClickCatcherClick={this.toggleMenu.bind(this)}>
          <div className="body">
            <OptionsList values={options} onClick={this.handleClick.bind(this)} />
            <Tags image={this.props.image} />
            <Persons image={this.props.image} />
          </div>
        </Panel>
      </div>
    );
  }
}

module.exports = Fullscreen;