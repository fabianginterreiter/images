import * as React from "react";
import {connect} from "react-redux";
import { Link } from "react-router";
import {removePersonToImage} from "../actions";
import {Image, Person} from "../types";

interface PersonsListProps {
  image: Image;
  removePersonToImage(image: Image, person: Person): void;
}

class PersonsList extends React.Component<PersonsListProps, {}> {
  public render() {
    return (
      <div className="tags">
        <h4><i className="fa fa-users" aria-hidden="true" /> Persons</h4>
        <ul>
          {
            this.props.image.persons.map((person) => (<li key={person.id}>
              <Link to={`/images/persons/${person.id}`}>{person.name}</Link>
              <span className="badge">
                <i className="icon-remove" onClick={this.handleDeletePerson.bind(this, person)} />
              </span>
            </li>))
          }
        </ul>
      </div>
    );
  }

  private handleDeletePerson(person: Person) {
    this.props.removePersonToImage(this.props.image, person);
  }
}

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removePersonToImage: (image: Image, person: Person) => dispatch(removePersonToImage(image, person))
  };
};

export default connect()(PersonsList);
