import {SET_NUMBER_OF_IMAGES} from "../actionTypes";
import Ajax from "../libs/Ajax";

export const loadNumberOfImages = () => {
  return (dispatch) => Ajax.get("/api/images/count").then((result) => dispatch({
    numberOfImages: result.count,
    type: SET_NUMBER_OF_IMAGES
  }));
};
