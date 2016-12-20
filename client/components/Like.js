var React = require('react');

var ImagesStore = require('../stores/ImagesStore');

class Like extends React.Component {
  render() {
    var className = this.props.image.liked ? 'icon-heart' : 'icon-heart-empty';
    
    return (
      <span className="like" onClick={ImagesStore.like.bind(ImagesStore, this.props.image)}><i className={className} /></span>
    );
  }
}

module.exports = Like;