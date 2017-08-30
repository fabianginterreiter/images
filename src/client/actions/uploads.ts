import {ADD_FILE_TO_UPLOAD, CANCEL_UPLOAD, SET_UPLOAD_COMPLETE, SET_UPLOAD_ERROR,
  SET_UPLOAD_PROGRESS, SET_UPLOAD_START} from "../actionTypes";
import {ExtendedFile, Image} from "../types";

export const addFilesToUploads = (files) => {
  return (dispatch) => {
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      dispatch(addFileToUploads(file));
    }
  };
};

export const addFileToUploads = (file) => {
  return {
    file: {
      name: file.name,
      file,
      complete: false,
      started: false,
      error: false,
      process: 0
    },
    type: ADD_FILE_TO_UPLOAD
  };
};

export const cancelUpload = () => {
  return {
    type: CANCEL_UPLOAD
  };
};

export const setUploadComplete = (file: ExtendedFile, image: Image) => {
  return {
    file,
    image,
    type: SET_UPLOAD_COMPLETE
  };
};

export const setUploadStart = (file: ExtendedFile) => {
  return {
    file,
    type: SET_UPLOAD_START
  };
};

export const setUploadError = (file: ExtendedFile) => {
  return {
    file,
    type: SET_UPLOAD_ERROR
  };
};

export const setUploadProgress = (file: ExtendedFile, progress: number) => {
  return {
    file,
    progress,
    type: SET_UPLOAD_PROGRESS
  };
};
