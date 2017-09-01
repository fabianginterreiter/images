import * as React from "react";
import {connect} from "react-redux";
import { Link } from "react-router";
import {addTag, addTagToImage, removeTag} from "../actions";
import {Image, Tag} from "../types";
import { AutoComplete } from "../utils/Utils";

interface TagsListProps {
  image: Image;
  addTagToImage(image: Image, tag: Tag): void;
  removeTag(image: Image, tag: Tag): void;
  addTag(tag: Tag): void;
}

class TagsList extends React.Component<TagsListProps, {}> {

  public render() {
    return (
      <div className="tags">
        <h4><i className="fa fa-tag" aria-hidden="true" /> Tags</h4>
        <div className="input">
          <AutoComplete service="/api/tags"
          onSelect={(tag) => this.props.addTagToImage(this.props.image, tag as Tag)}
          ignore={this.props.image.tags} placeholder="Add Tag" />
        </div>

        <ul>
          {
            this.props.image.tags.map((tag) => (<li key={tag.id}>
              <Link to={`/images/tags/${tag.id}`}>{tag.name}</Link>
              <span className="badge">
                <i className="fa fa-times" aria-hidden="true" onClick={() => this.props.removeTag(this.props.image, tag)} />
              </span>
            </li>))
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    albums: state.albums,
    selection: state.selection,
    tags: state.tags
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTag: (tag: Tag) => dispatch(addTag(tag)),
    addTagToImage: (image: Image, tag: Tag) => dispatch(addTagToImage(image, tag)),
    removeTag: (image: Image, tag: Tag) => dispatch(removeTag(image, tag))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagsList);
