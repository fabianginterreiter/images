const React = require('react');
const Link = require('react-router').Link;
const AutoComplete = require('./AutoComplete');
const ImagesStore = require('../stores/ImagesStore');

class Tags extends React.Component {

  handleAddTag(tag) {
    ImagesStore.addTag(this.props.image, tag);
  }

  handleDeleteTag(tag) {
    ImagesStore.deleteTag(this.props.image, tag);
  }

  render() {
    return (
      <div>
        <AutoComplete service='/api/tags' onSelect={this.handleAddTag.bind(this)} ignore={this.props.image.tags} />

        <h4>Tags</h4>
        <ul>
          {
            this.props.image.tags.map((tag, idx) => (<li key={tag.id}>
              <Link to={`/images/tags/${tag.id}`}>{tag.name}</Link>
              <i className="icon-remove" onClick={this.handleDeleteTag.bind(this, tag)} />
            </li>))
          }
        </ul>
      </div>
    );
  }
}

module.exports = Tags;