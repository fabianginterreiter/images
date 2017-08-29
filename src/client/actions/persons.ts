import {DELETE_PERSON, SAVE_PERSON, SET_PERSONS, SORT_PERSONS} from "../actionTypes";
import Ajax from "../libs/Ajax";
import {Person} from "../types/types";

export const loadPersons = () => {
  return (dispatch) => Ajax.get("/api/persons").then((persons) => dispatch({
    type: SET_PERSONS,
    persons
  }));
};

export const sortPersons = (key: string, asc: boolean) => {
  return {
    type: SORT_PERSONS,
    key,
    asc
  };
};

export const savePerson = (person: Person) => {
  return (dispatch) => Ajax.put(`/api/persons/${person.id}`, person).then(() => dispatch({
    type: SAVE_PERSON,
    person
  }));
};

export const deletePerson = (person: Person) => {
  return (dispatch) => Ajax.delete(`/api/persons/${person.id}`).then(() => dispatch({
    type: DELETE_PERSON,
    person
  }));
};
