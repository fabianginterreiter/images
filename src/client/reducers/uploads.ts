import {ADD_FILE_TO_UPLOAD, CANCEL_UPLOAD, SET_UPLOAD_COMPLETE, SET_UPLOAD_ERROR,
  SET_UPLOAD_PROGRESS, SET_UPLOAD_START, START_UPLOAD} from "../actionTypes";

import {ExtendedFile} from "../types/types";

export default function users(state = {
  files: [],
  status: null
},                            action) {
  switch (action.type) {
    case ADD_FILE_TO_UPLOAD:
      return {...state, files: [
          ...state.files,
          action.file
      ]};
    case CANCEL_UPLOAD:
      return {...state, files: [], status: "CANCELED"};
    case SET_UPLOAD_START:
      return {...state, files: state.files.map((file: ExtendedFile) => {
        if (file.name === action.file.name) {
          return {...file, complete: false, started: true, process: 0, error: false};
        }
        return file;
      })};
    case SET_UPLOAD_PROGRESS:
      return {...state, files: state.files.map((file: ExtendedFile) => {
        if (file.name === action.file.name) {
          return {...file, progress: action.progress};
        }
        return file;
      })};
    case SET_UPLOAD_COMPLETE:
      return {...state, files: state.files.map((file: ExtendedFile) => {
        if (file.name === action.file.name) {
          return {...file, complete: true, image: action.image};
        }
        return file;
      })};
    case SET_UPLOAD_ERROR:
      return {...state, files: state.files.map((file: ExtendedFile) => {
        if (file.name === action.file.name) {
          return {...file, complete: false, error: true};
        }
        return file;
      })};
    default:
      return state;
  }
}
