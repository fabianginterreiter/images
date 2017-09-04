import * as React from "react";
import {connect} from "react-redux";
import { Link } from "react-router";
import {removePersonToImage} from "../actions";
import {Image, Person} from "../types";
import {t, getLanguage} from "../libs/Translation";

interface PersonsListProps {
  image: Image;
  hideEmptyList?: boolean;
  removePersonToImage(image: Image, person: Person): void;
}

class PersonsList extends React.Component<PersonsListProps, {}> {
  public render() {
    if (this.props.hideEmptyList && this.props.image.persons.length === 0) {
      return <span />;
    }

    return (
      <div className="tags">
        <h4><i className="fa fa-users" aria-hidden="true" /> {t("persons.title")}</h4>
        <ul>
          {
            this.props.image.persons.sort((a, b) => a.name.localeCompare(b.name)).map((person) => (<li key={person.id}>
              <Link to={`/images/persons/${person.id}`}>{person.name}</Link>
              <span className="badge">
                <i className="fa fa-times" aria-hidden="true" onClick={this.handleDeletePerson.bind(this, person)} />
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
    language: getLanguage(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removePersonToImage: (image: Image, person: Person) => dispatch(removePersonToImage(image, person))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonsList);
