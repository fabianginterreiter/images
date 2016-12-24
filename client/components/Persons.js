"use strict"

const React = require('react');
const $ = require("jquery");
const Link = require('react-router').Link;
const Quickedit = require('./Quickedit');
const DialogStore = require('../stores/DialogStore');
const NavigationsStore = require('../stores/NavigationsStore');

class Persons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      persons: []
    }
  }

  componentDidMount() {
    fetch('/api/persons').then((result) => result.json()).then((persons) => this.setState({persons:persons}));
  }

  componentWillUnmount() {
  }

  handleEdit(person) {
    person.edit = true;
    this.forceUpdate();
  }

  handleChange(person, value) {
    person.name = value;
    person.edit = false;

    fetch('/api/persons/' + person.id, {
      method: "PUT",
      credentials: 'include',
      body: JSON.stringify(person), 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      this.forceUpdate();
    });
  }

  handleCancel(person) {
    person.edit = false;
    this.forceUpdate();
  }

  handleDelete(person) {
    DialogStore.open('Delete Person', 'Do you really want to delete the Person?').then((result) => {
      if (result) {
        fetch('/api/persons/' + person.id, {
          method: "DELETE",
          credentials: 'include'
        }).then(() => {
          for (var index = 0; index < this.state.persons.length; index++) {
            if (this.state.persons[index].id === person.id) {
              this.state.persons.splice(index, 1);
              break;
            }
          }
          this.forceUpdate();
          NavigationsStore.load();
        });
      }
    });
  }

  _renderText(person) {
    if (person.edit) {
      return (<Quickedit 
        value={person.name} 
        onChange={(value) => this.handleChange(person, value)} 
        onCancel={() => this.handleCancel(person)} />);
    }

    return (<Link to={`/images/persons/${person.id}`}>{person.name}</Link>);
  }

  render() {
    return (<div className="settings">
      <h1>Persons</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th className="option">Edit</th>
            <th className="option">Delete</th>
          </tr>
        </thead>
        <tbody>
          {this.state.persons.map((person) => (<tr key={person.id}>
            <td>{this._renderText(person)}</td>
            <td onClick={this.handleEdit.bind(this, person)} className="option"><i className="icon-cog" /></td>
            <td onClick={this.handleDelete.bind(this, person)} className="option"><i className="icon-trash" /></td>
          </tr>))}
        </tbody>
      </table>
    </div>);
  }
}

module.exports = Persons;