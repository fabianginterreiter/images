var React = require('react');
var moment = require('moment');
var $ = require("jquery");
var Image = require('./Image');
var DateDivider = require('./DateDivider');
var Fullscreen = require('./Fullscreen');
var Like = require('./Like');
var Empty = require('./Empty');

var ImagesStore = require('../stores/ImagesStore');
var ThumbnailsSizeStore = require('../stores/ThumbnailsSizeStore');
var NavigationsState = require('../states/NavigationsState');
var NavigationsStore = require('../stores/NavigationsStore');
var KeyUpListener = require('../stores/KeyUpListener');
var ResizeListener = require('../stores/ResizeListener');

var history = require('react-router').browserHistory;

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

  componentWillReceiveProps(nextProps) {
    this.setState({
      view: -1
    });

    var option = NavigationsStore.getOption(nextProps.location.pathname);

    if (option) {
      return ImagesStore.load(option.service);
    }

    let routeParams = nextProps.routeParams;
    if (routeParams) {
      if (routeParams.year && routeParams.month && routeParams.day) {
        return ImagesStore.load('/api/images?year=' + routeParams.year + '&month=' + routeParams.month + '&day=' + routeParams.day);
      }
    }

    return ImagesStore.load('/api/images');
  }

  componentDidMount() {
    ImagesStore.addChangeListener(this, this.updateImages.bind(this));
    ThumbnailsSizeStore.addChangeListener(this, (size) => (this.setState({size:size})));
    NavigationsState.addChangeListener(this, this.handlePinningNavigation.bind(this));
    KeyUpListener.addChangeListener(this, this.handleKeyUp.bind(this));
    ResizeListener.addChangeListener(this, this.handleResize.bind(this));

    this.width = document.getElementById('container').clientWidth;

    this.componentWillReceiveProps(this.props);
  }

  componentWillUnmount() {
    ImagesStore.removeChangeListener(this);
    ThumbnailsSizeStore.removeChangeListener(this);
    NavigationsState.removeChangeListener(this);
    KeyUpListener.removeChangeListener(this);
    ResizeListener.removeChangeListener(this);
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
    
    history.push('/images/dates/'+ year + '/' + month + '/' + day);
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
            <DateDivider date={datetime} onClick={this.loadFromDate.bind(this, image.year, image.month, image.day)} />
            <div className="dateSelect" onClick={this.handleDateSelect.bind(this, idx)}><i className="icon-check"></i></div>
          </div>);
        lastDate = newDate;
      }

      var className = 'item';

      var style = image.displayWidth > 0 ? {width: image.displayWidth + 'px', height: image.displayHeight + 'px'} : {height: ThumbnailsSizeStore.getObject() + 'px'};

      if (image.selected) {
        className += ' selected';
      }

      var checkBoxClass = image.selected ? "icon-check" : "icon-check-empty";

      elements.push(
        <div className={className} key={image.id} onClick={this.handleClick.bind(this, idx)}>
          <Image image={image} style={style} />
          <div className="select" onClick={this.handleSelect.bind(this, image)}><i className={checkBoxClass}></i></div>
          <Like image={image} />
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