"use strict"

import React from 'react'
import $ from 'jquery'
import Utils from '../utils/Utils'
import { OptionsList, DialogStore, Panel } from '../utils/Utils'
import Like from './Like'
import TagsList from './TagsList'
import PersonsList from './PersonsList'
import ImagesStore from '../stores/ImagesStore'
import Faces from './Faces'
import moment from 'moment'

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
    Utils.KeyUpListener.addChangeListener(this, this.handleKeyUp.bind(this));
    Utils.ResizeListener.addChangeListener(this, this.handleImageLoad.bind(this));
    $("body").css("overflow", "hidden");
    this._show();
  }

  componentWillUnmount() {
    Utils.KeyUpListener.removeChangeListener(this);
    Utils.ResizeListener.removeChangeListener(this);     
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
        DialogStore.open('Delete Image', 'Do you really want to delete the image?')
        .then(() => ImagesStore.delete(this.props.image)).catch((e) => console.log(e));
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
          {this.props.image.title} ({this.props.number}/{this.props.size})
          <div className="options">
            <Like image={this.props.image} />&nbsp;
            <i className="fa fa-bars" onClick={this.toggleMenu.bind(this)} />
          </div>
        </div>
        <div className="previous" onClick={this.props.previous} />
        <div className="next" onClick={this.props.next} />
        <Panel open={this.state.menu} clickCatcher={this.state.menu} side='right' onClickCatcherClick={this.toggleMenu.bind(this)} header={true}>
          <div className="title">
          </div>
          <div className="body">
            <div>Filename: {this.props.image.filename}</div>
            <div>Resolution: {this.props.image.width}/{this.props.image.height}</div>
            <div>Date: {moment(this.props.image.date).format('YYYY MMMM DD HH:mm:ss')}</div>

            <OptionsList values={options} onClick={this.handleClick.bind(this)} />
            <TagsList image={this.props.image} />
            <PersonsList image={this.props.image} />
          </div>
        </Panel>
      </div>
    );
  }
}

module.exports = Fullscreen;