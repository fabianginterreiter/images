import {ADD_PERSON_TO_IMAGE, DELETE_PERSON, SAVE_PERSON, SET_PERSONS, SORT_PERSONS} from "../actionTypes";

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
    case ADD_PERSON_TO_IMAGE:
      return state.find((person) => person.id === action.person.id) ?
        state.map((person) => {
          if (person.id === action.person.id) {
            return {...person, count: person.count + 1};
          }

          return person;
        })
        : [...state, action.person].sort((a, b) => a.name.localeCompare(b.name));
    default:
      return state;
  }
}
