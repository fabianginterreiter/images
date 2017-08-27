import {ADD_ALBUM_TO_IMAGE, ADD_PERSON_TO_IMAGE, ADD_TAG_TO_IMAGE, DELETE_ALBUM,
  DELETE_IMAGE, DELETE_PERSON, DELETE_TAG,
  LIKE_IMAGE, REMOVE_ALBUM_FROM_IMAGE, REMOVE_PERSON_TO_IMAGE, REMOVE_TAG, REVERT_IMAGE,
  SET_IMAGES, UNLIKE_IMAGE} from "../actionTypes";

export default function images(state = [], action) {
  switch (action.type) {
    case SET_IMAGES:
      return action.images;
    case LIKE_IMAGE:
      return state.map((image) => {
        if (image.id === action.image.id) {
          return {...image, liked: true};
        } else {
          return image;
        }
      });
    case UNLIKE_IMAGE:
      return state.map((image) => {
        if (image.id === action.image.id) {
          return {...image, liked: false};
        } else {
          return image;
        }
      });
    case ADD_TAG_TO_IMAGE:
      return state.map((image) => {
        if (image.id === action.image.id) {
          return {...image, tags: [...image.tags, action.tag]};
        }
        return image;
      });
    case REMOVE_TAG:
      return state.map((image) => {
        if (image.id === action.image.id) {
          image.tags = image.tags.filter((tag) => (tag.id !== action.tag.id));
        }
        return image;
      });
    case ADD_ALBUM_TO_IMAGE:
      return state.map((image) => {
        if (image.id === action.image.id) {
          return {...image, albums: [...image.albums, action.album]};
        }
        return image;
      });
    case REMOVE_ALBUM_FROM_IMAGE:
      return state.map((image) => {
        if (image.id === action.image.id) {
          image.albums = image.albums.filter((album) => (album.id !== action.album.id));
        }
        return image;
      });
    case ADD_PERSON_TO_IMAGE:
      return state.map((image) => {
        if (image.id === action.image.id) {
          return {...image, persons: [...image.persons, action.person]};
        }
        return image;
      });
    case REMOVE_PERSON_TO_IMAGE:
      return state.map((image) => {
        if (image.id === action.image.id) {
          image.persons = image.persons.filter((person) => (person.id !== action.person.id));
        }
        return image;
      });
    case DELETE_TAG:
      return state.map((image) => {
        image.tags = image.tags.filter((tag) => (tag.id !== action.tag.id));
        return image;
      });
    case DELETE_ALBUM:
      return state.map((image) => {
        image.albums = image.albums.filter((album) => (album.id !== action.album.id));
        return image;
      });
    case DELETE_PERSON:
      return state.map((image) => {
        image.persons = image.persons.filter((person) => (person.id !== action.person.id));
        return image;
      });
    case DELETE_IMAGE:
      return state.filter((image) => image.id === action.image.id);
    case REVERT_IMAGE:
      return state.map((image) => {
        if (image.id === action.image.id) {
          return {...image, deleted: false};
        }
        return image;
      });
    default:
      return state;
  }
}
