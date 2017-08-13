import * as React from "react";
import { Link } from "react-router";
import ImagesStore from "../stores/ImagesStore";
import {Image, Tag} from "../types/types";
import { AutoComplete } from "../utils/Utils";

interface TagsListProps {
  image: Image;
}

export default class TagsList extends React.Component<TagsListProps, {}> {

  private handleAddTag(tag: Tag): void {
    ImagesStore.addTag(this.props.image, tag);
  }

  private handleDeleteTag(tag: Tag): void {
    ImagesStore.deleteTag(this.props.image, tag);
  }

  render() {
    return (
      <div className="tags">
        <h4><i className="fa fa-tag" aria-hidden="true" /> Tags</h4>

        <div className="input">
          <AutoComplete service="/api/tags" onSelect={this.handleAddTag.bind(this)} ignore={this.props.image.tags} placeholder="Add Tag" />
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
