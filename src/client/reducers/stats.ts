import {SET_NUMBER_OF_IMAGES} from "../actionTypes";

export default function stats(state = {
 numberOfImages: false
},                              action) {
 switch (action.type) {
   case SET_NUMBER_OF_IMAGES:
     return {
       numberOfImages: action.numberOfImages
     };
   default:
     return state;
 }
}
