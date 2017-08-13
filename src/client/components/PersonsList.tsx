import * as React from "react"
import { Link } from "react-router"
import ImagesStore from "../stores/ImagesStore"
import {Image} from "../types/types"

interface PersonsListProps {
  image: Image;
}

interface PersonsListState {

}

export default class PersonsList extends React.Component<PersonsListProps, PersonsListState> {
  handleDeletePerson(person) {
    ImagesStore.deletePerson(this.props.image, person);
  }

  render() {
    return (
      <div className="tags">
        <h4><i className="fa fa-users" aria-hidden="true" /> Persons</h4>
        <ul>
          {
            this.props.image.persons.map((person) => (<li key={person.id}>
              <Link to={`/images/persons/${person.id}`}>{person.name}</Link>
              <span className="badge"><i className="icon-remove" onClick={this.handleDeletePerson.bind(this, person)} /></span>
            </li>))
          }
        </ul>
      </div>
    );
  }
}
