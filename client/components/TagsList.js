"use strict"

const React = require('react');
const Link = require('react-router').Link;
const AutoComplete = require('../utils/Utils').AutoComplete;
const ImagesStore = require('../stores/ImagesStore');

class TagsList extends React.Component {

  handleAddTag(tag) {
    ImagesStore.addTag(this.props.image, tag);
  }

  handleDeleteTag(tag) {
    ImagesStore.deleteTag(this.props.image, tag);
  }

  render() {
    return (
      <div className="tags">
        <h4>Tags</h4>

        <div className="input">
          <AutoComplete service='/api/tags' onSelect={this.handleAddTag.bind(this)} ignore={this.props.image.tags} placeholder='Add Tag' />
        </div>

        <ul>
          {
            this.props.image.tags.map((tag, idx) => (<li key={tag.id}>
              <Link to={`/images/tags/${tag.id}`}>{tag.name}</Link>
              <span className="badge"><i className="icon-remove" onClick={this.handleDeleteTag.bind(this, tag)} /></span>
            </li>))
          }
        </ul>
      </div>
    );
  }
}

module.exports = TagsList;