import {SET_PERSONS, SORT_PERSONS, SAVE_PERSON, DELETE_PERSON} from "../actionTypes"

export default function persons(state = [], action) {
  switch (action.type) {
    case SET_PERSONS:
      return action.persons.sort((a, b) => a.name.localeCompare(b.name));
    case SORT_PERSONS:
      return state.sort((a, b) => {
        if (a[action.key] < b[action.key]) {
          return action.asc ? -1 : 1;
        } else if (a[action.key] > b[action.key]) {
          return action.asc ? 1 : -1;
        }
        return 0;
      });
    case SAVE_PERSON:
      return state.map((person) => {
        if (person.id === action.person.id) {
          return action.person;
        }
        return person;
      });
    case DELETE_PERSON:
      return state.filter((person) => (person.id !== action.person.id));
    default:
      return state;
  }
}
