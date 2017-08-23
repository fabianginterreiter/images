import {SET_PERSONS, SORT_PERSONS, SAVE_PERSON, DELETE_PERSON} from "../actionTypes";
import {Person} from "../types/types";
import Ajax from "../libs/Ajax";

export const loadPersons = () => {
  return (dispatch) => Ajax.get("/api/persons").then((persons) => dispatch({
    type: SET_PERSONS,
    persons: persons
  }))
}

export const sortPersons = (key: string, asc: boolean) => {
  return {
    type: SORT_PERSONS,
    key: key,
    asc: asc
  }
}

export const savePerson = (person: Person) => {
  return (dispatch) => Ajax.put(`/api/persons/${person.id}`, person).then(() => dispatch({
    type: SAVE_PERSON,
    person: person
  }))
}

export const deletePerson = (person: Person) => {
  return (dispatch) => Ajax.delete(`/api/persons/${person.id}`).then(() => dispatch({
    type: DELETE_PERSON,
    person: person
  }));
}
