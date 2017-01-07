"use strict"

const React = require('react');
const Link = require('react-router').Link;
const ImagesStore = require('../stores/ImagesStore');

class PersonsList extends React.Component {

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

module.exports = PersonsList;