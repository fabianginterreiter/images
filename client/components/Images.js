"use strict"

const React = require('react');
const moment = require('moment');
const $ = require("jquery");
const Image = require('./Image');
const Fullscreen = require('./Fullscreen');
const Like = require('./Like');
const Empty = require('./Empty');
const ImagesStore = require('../stores/ImagesStore');
const ThumbnailsSizeStore = require('../stores/ThumbnailsSizeStore');
const NavigationsState = require('../states/NavigationsState');
const NavigationsStore = require('../stores/NavigationsStore');
const Utils = require('../utils/Utils');
const SelectionStore = require('../stores/SelectionStore');
const Link = require('react-router').Link;
const ShowDateStore = require('../stores/ShowDateStore');

class Images extends React.Component {
  constructor(props) {
    super(props);

    this.bundledImages = [];

    this.state = {
      view: -1,
      width: -1,
      images: [],
      size: ThumbnailsSizeStore.getObject()
    };

    this.lastSelection = -1;
  }

  componentDidMount() {
    ImagesStore.addChangeListener(this, (images) => this.setState({images:images}));
    ThumbnailsSizeStore.addChangeListener(this, (size) => (this.setState({size:size})));
    NavigationsState.addChangeListener(this, this.handlePinningNavigation.bind(this));
    Utils.KeyUpListener.addChangeListener(this, this.handleKeyUp.bind(this));
    Utils.ResizeListener.addChangeListener(this, this.handleResize.bind(this));
    SelectionStore.addChangeListener(this, () => this.forceUpdate());
    ShowDateStore.addChangeListener(this, () => this.forceUpdate());

    this.width = document.getElementById('container').clientWidth;
  }

  componentWillUnmount() {
    ImagesStore.removeChangeListener(this);
    ThumbnailsSizeStore.removeChangeListener(this);
    NavigationsState.removeChangeListener(this);
    Utils.KeyUpListener.removeChangeListener(this);
    Utils.ResizeListener.removeChangeListener(this);
    SelectionStore.removeChangeListener(this);
    ShowDateStore.removeChangeListener(this);
  }

  handlePinningNavigation() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(function() {
      var container = document.getElementById('container');
      if (!container) {
        return;
      }

      var width = container.clientWidth;

      if (width !== this.width) {
        this.width = width;
        this.forceUpdate();  
      }
    }.bind(this), 500);
  }

  handleResize() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(function() {
      var container = document.getElementById('container');
      if (!container) {
        return;
      }
      var width = container.clientWidth;

      if (width !== this.width) {
        this.width = width;
        this.forceUpdate();  
      }
    }.bind(this), 100);
  }

  handleKeyUp(e) {
    if (document.activeElement.tagName === 'INPUT') {
      return;
    }

    switch (e.keyCode) {
      case 27: {
        this.handleFullscreenClose();
        break;
      }

      case 37: {
        this.handlePrevious();
        break;
      }

      case 39: {
        this.handleNext();
        break;
      }

      case 65: {
        if (e.ctrlKey) {
          this.state.images.forEach((image) => SelectionStore.select(image));  
        }
        break;
      }
    }
  }

  handleFullscreenClose() {
    this.setState({
      view: -1
    });
  }

  handleNext() {
    if (this.state.view < this.state.images.length - 1) {
      this.setState({
        view: this.state.view + 1
      });
    }
  }

  handlePrevious() {
    if (this.state.view > 0) {
      this.setState({
        view: this.state.view - 1
      });
    }
  }

  handleClick(idx, event) {
    if ('mark' !== event.target.className) {
      return;
    }

    this.setState({
      view: idx
    });
  }

  handleSelect(idx, event) {
    if (event.shiftKey && this.lastSelection >= 0) {
      if (SelectionStore.isSelected(this.state.images[idx])) {
        for (var index = Math.min(this.lastSelection, idx); index <= Math.max(this.lastSelection, idx); index++) {
          SelectionStore.unselect(this.state.images[index]);
        }
      } else {
        for (var index = Math.min(this.lastSelection, idx); index <= Math.max(this.lastSelection, idx); index++) {
          SelectionStore.select(this.state.images[index]);
        }
      }
    } else {
      SelectionStore.handle(this.state.images[idx]);
    }

    this.lastSelection = idx;
  }

  handleDateSelect(idx) {
    var date = this.state.images[idx].year + '' + this.state.images[idx].month + '' + this.state.images[idx].day;
    
    var hasNotSelected = false;

    var index = idx;

    for (; index < this.state.images.length; index++) {
      var newDate = this.state.images[index].year + '' + this.state.images[index].month + '' + this.state.images[index].day;
      
      if (newDate !== date) {
        break;
      }

      if (!SelectionStore.isSelected(this.state.images[index])) {
        hasNotSelected = true;
      }
    }

    for (var i = idx; i < index; i++) {
      if (hasNotSelected) {
        SelectionStore.select(this.state.images[i]);
      } else {
        SelectionStore.unselect(this.state.images[i]);
      }
    }

    this.forceUpdate();
  }

  _calcuateDisplayWidth(imgs) {
    var date = null;
    var sum = 0;
    var images = [];

    if (!this.width) {
      return;
    }

    var max = this.width / ThumbnailsSizeStore.getObject();

    imgs.forEach(function(image) {
      if (!image.proportion) {
        image.proportion = image.width / image.height;
      }

      image.displayWidth = 0;

      sum += image.proportion;
      images.push(image);

      if (sum > max) {
        var widthSize = (this.width - 2 * 1 * images.length) / sum;
        images.forEach(function(image) {
          image.displayWidth = image.proportion * widthSize;
          image.displayHeight = image.displayWidth / image.proportion;
        });

        sum = 0;
        images = [];
      }
    }.bind(this));
  }

  render() {
    if (this.state.images.length === 0) {
      return (<div id="container">
        <Empty />
      </div>);
    }
    
    var view = (<span></span>);

    if (this.state.view >= 0) {
      view = (
        <Fullscreen 
          image={this.state.images[this.state.view]} 
          next={this.handleNext.bind(this)} 
          previous={this.handlePrevious.bind(this)} 
          handleClose={this.handleFullscreenClose.bind(this)}
          number={this.state.view + 1} size={this.state.images.length} />
      );
    }

    var elements = [];

    var lastDate = '';

    this._calcuateDisplayWidth(this.state.images);

    this.state.images.forEach(function(image, idx) {
      var newDate = image.year + '' + image.month + '' + image.day;

      var className = 'item';

      var style = image.displayWidth > 0 ? {width: image.displayWidth + 'px', height: image.displayHeight + 'px'} : {height: ThumbnailsSizeStore.getObject() + 'px'};

      if (SelectionStore.isSelected(image)) {
        className += ' selected';
      }

      var checkBoxClass = image.selected ? "icon-check" : "icon-check-empty";

      if (ShowDateStore.getObject() && lastDate !== newDate) {
        elements.push(
          <div className={className} key={image.id} onClick={this.handleClick.bind(this, idx)}>
            <div style={{width: image.displayWidth + 'px'}}><i className="icon-check" onClick={this.handleDateSelect.bind(this, idx)} /> <Link to={`/images/dates/${image.year}/${image.month}/${image.day}`}>{newDate}</Link> </div>
            <div className='imgBorder'>
              <Image image={image} style={style} />
              <div className="select" onClick={this.handleSelect.bind(this, idx)}><i className={checkBoxClass}></i></div>
              <Like image={image} />
              <div className="mark" />
            </div>
          </div>); 

        lastDate = newDate;
      } else {
        elements.push(
          <div className={className} key={image.id} onClick={this.handleClick.bind(this, idx)}>
            <Image image={image} style={style} />
            <div className="select" onClick={this.handleSelect.bind(this, idx)}><i className={checkBoxClass}></i></div>
            <Like image={image} />
            <div className="mark" />
          </div>);  
      }
    }.bind(this));

    return (
      <div id="container">
        {view}
        <div className={'container size' + this.state.size}>
          {elements}
        </div>
      </div>
    )
  }
}

module.exports = Images;