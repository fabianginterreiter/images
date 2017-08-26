import {SET_TAGS, SORT_TAGS, SAVE_TAG, DELETE_TAG, ADD_TAG} from "../actionTypes";
import {Tag} from "../types/types";
import Ajax from "../libs/Ajax";

export const loadTags = () => {
  return (dispatch) => Ajax.get("/api/tags").then((tags) => dispatch({
    tags,
    type: SET_TAGS
  }));
};

export const sortTags = (key: string, asc: boolean) => {
  return {
    asc,
    key,
    type: SORT_TAGS
  };
};

export const saveTag = (tag: Tag) => {
  return (dispatch) => Ajax.put(`/api/tags/${tag.id}`, tag).then(() => dispatch({
    tag,
    type: SAVE_TAG
  }));
};

export const deleteTag = (tag: Tag) => {
  return (dispatch) => Ajax.delete(`/api/tags/${tag.id}`).then(() => dispatch({
    tag,
    type: DELETE_TAG
  }));
};

export const addTag = (tag: Tag) => {
  return {
    tag,
    type: ADD_TAG
  };
};
