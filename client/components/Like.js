var React = require('react');

var ImagesStore = require('../stores/ImagesStore');

class Like extends React.Component {

  handleClick() {
    if (this.props.image.liked) {
      fetch('/api/images/' + this.props.image.id + '/unlike', {
        method: "PUT",
        credentials: 'include'
      }).then(() => {
        this.props.image.liked = false;
        ImagesStore.dispatch();
      });
    } else {
      fetch('/api/images/' + this.props.image.id + '/like', {
        method: "PUT",
        credentials: 'include'
      }).then(() => {
        this.props.image.liked = true;
        ImagesStore.dispatch();
      });
    }
  }

  render() {
    var className = this.props.image.liked ? 'icon-heart' : 'icon-heart-empty';
    
    return (
      <div className="like" onClick={this.handleClick.bind(this)}><i className={className} /></div>
    );
  }
}

module.exports = Like;