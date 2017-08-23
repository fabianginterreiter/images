import {SET_TAGS, SORT_TAGS, SAVE_TAG, DELETE_TAG,} from "../actionTypes";
import {Tag} from "../types/types";
import Ajax from "../libs/Ajax";

export const loadTags = () => {
  return (dispatch) => Ajax.get("/api/tags").then((tags) => dispatch({
    type: SET_TAGS,
    tags: tags
  }))
}

export const sortTags = (key: string, asc: boolean) => {
  return {
    type: SORT_TAGS,
    key: key,
    asc: asc
  }
}

export const saveTag = (tag: Tag) => {
  return (dispatch) => Ajax.put(`/api/tags/${tag.id}`, tag).then(() => dispatch({
    type: SAVE_TAG,
    tag: tag
  }))
}

export const deleteTag = (tag: Tag) => {
  return (dispatch) => Ajax.delete(`/api/tags/${tag.id}`).then(() => dispatch({
    type: DELETE_TAG,
    tag: tag
  }));
}
