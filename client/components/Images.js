var React = require('react');
var moment = require('moment');
var $ = require("jquery");
var Image = require('./Image');
var DateDivider = require('./DateDivider');
var Fullscreen = require('./Fullscreen');

var ImagesStore = require('../stores/ImagesStore');
var ThumbnailsSizeStore = require('../stores/ThumbnailsSizeStore');

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
  }

  updateImages(images) {
    this.bundledImages = this._bundleImages(images);
    this.setState({images:images})
  }

  componentDidMount() {
    ImagesStore.addChangeListener(this.updateImages.bind(this));
    ThumbnailsSizeStore.addChangeListener((size) => (this.setState({size:size})));

    $(document).keyup(this.handleKeyUp.bind(this));

    this.width = document.getElementById('container').clientWidth;

    window.addEventListener('resize', this.handleResize.bind(this), true);
  }

  handleResize() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(function() {
      this.width = document.getElementById('container').clientWidth;
      this.forceUpdate();
    }.bind(this), 100);
  }

  componentWillUnmount() {
    $(document).unbind('keyup', this.handleKeyUp.bind(this));
  }

  handleKeyUp(e) {
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

  handleSelect(image, event) {
    image.selected = !image.selected;
    event.preventDefault();
    this.forceUpdate()
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

      if (!this.state.images[index].selected) {
        hasNotSelected = true;
      }
    }

    for (var i = idx; i < index; i++) {
      this.state.images[i].selected = hasNotSelected;
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

  _bundleImages(images) {
    var bundles = [];

    var current = [];

    var date = null;

    images.forEach(function(image) {
      if (!date) {
        date = image.year + '' + image.month + '' + image.day;
      }

      var newDate = image.year + '' + image.month + '' + image.day;

      if (newDate === date) {
        current.push(image);
      } else {
        bundles.push(current);
        current = [image];
        date = newDate;
      }
    });

    bundles.push(current);

    return bundles;
  }

  loadFromDate(year, month, day) {
    ImagesStore.load('/api/images?year=' + year + '&month=' + month + '&day=' + day);
  }

  render() {
    var view = (<span></span>);

    if (this.state.view >= 0) {
      view = (
        <Fullscreen 
          image={this.state.images[this.state.view]} 
          next={this.handleNext.bind(this)} 
          previous={this.handlePrevious.bind(this)} 
          handleClose={this.handleFullscreenClose.bind(this)} />
      );
    }

    var elements = [];

    var lastDate = '';

    this.bundledImages.forEach((images) => (this._calcuateDisplayWidth(images)));

    this.state.images.forEach(function(image, idx) {
      var newDate = image.year + '' + image.month + '' + image.day;
      if (lastDate !== newDate) {
        var datetime = new Date(image.date);
        elements.push(
          <div className='date' key={newDate}>
            <DateDivider date={datetime} />
            <span onClick={this.loadFromDate.bind(this, image.year, image.month, image.day)}>Select</span>
            <div className="select" onClick={this.handleDateSelect.bind(this, idx)}>☑</div>
          </div>);
        lastDate = newDate;
      }

      var className = 'item';

      var style = image.displayWidth > 0 ? {width: image.displayWidth + 'px', height: image.displayHeight + 'px'} : {height: ThumbnailsSizeStore.getObject() + 'px'};

      if (image.selected) {
        className += ' selected';
      }

      elements.push(
        <div className={className} key={image.id} onClick={this.handleClick.bind(this, idx)}>
          <Image image={image} style={style} />
          <div className="select" onClick={this.handleSelect.bind(this, image)}>☑</div>
          <div className="mark" />
        </div>);
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