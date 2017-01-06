var React = require('react');

var ImagesStore = require('../stores/ImagesStore');

class Like extends React.Component {
  render() {
    var className = this.props.image.liked ? 'fa fa-heart' : 'fa fa-heart-o';
    
    return (
      <span className="like" onClick={ImagesStore.like.bind(ImagesStore, this.props.image)}><i className={className} aria-hidden="true" /></span>
    );
  }
}

module.exports = Like;