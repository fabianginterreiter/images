"use strict"

import React from 'react'
import $ from 'jquery'
import { Link } from 'react-router'
import{ Quickedit, DialogStore, ExtendedTable, sort } from '../utils/Utils'
import NavigationsStore from '../stores/NavigationsStore'
import Ajax from '../libs/Ajax'

class Persons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      persons: []
    }
  }

  componentDidMount() {
    Ajax.get('/api/persons').then((persons) => this.setState({persons:persons}));
  }

  componentWillUnmount() {
  }

  handleEdit(person) {
    person.edit = true;
    this.forceUpdate();
  }

  handleChange(person, value) {
    person.edit = false;

    if (person.name === value) {
      return this.forceUpdate();
    }

    person.name = value;

    Ajax.put('/api/persons/' + person.id, person).then(() => {
      this.forceUpdate();
    });
  }

  handleCancel(person) {
    person.edit = false;
    this.forceUpdate();
  }

  handleDelete(person) {
    DialogStore.open('Delete Person', 'Do you really want to delete the Person?', {
      type: 'warning',
      icon: 'fa fa-trash'
    }).then(() => Ajax.delete('/api/persons/' + person.id)).then(() => {
      for (var index = 0; index < this.state.persons.length; index++) {
        if (this.state.persons[index].id === person.id) {
          this.state.persons.splice(index, 1);
          break;
        }
      }
      this.forceUpdate();
      NavigationsStore.load();
    }).catch((e) => console.log(e));
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

  _renderRow(person) {
    return (<tr key={person.id}>
      <td>{this._renderText(person)}</td>
      <td>{person.count}</td>
      <td onClick={this.handleEdit.bind(this, person)} className="option"><i className="fa fa-pencil-square-o" /></td>
      <td onClick={this.handleDelete.bind(this, person)} className="option"><i className="fa fa-trash-o" /></td>
    </tr>);
  }

  order(name, asc) {
    sort(this.state.persons, name, asc).then((persons) => this.setState({
      persons:persons
    }));
  }

  render() {
    return (<div className="settings">
      <h1><i className="fa fa-users" aria-hidden="true" /> Persons</h1>

      <ExtendedTable columns={[
        {title:'Name', name: 'name'},
        {title:'Images', name: 'count', className:'option'},
        {title:'Edit', className:'option'},
        {title:'Delete', className:'option'}]} data={this.state.persons} render={this._renderRow.bind(this)} order={this.order.bind(this)} name={'name'} asc={true} />

    </div>);
  }
}

module.exports = Persons;
