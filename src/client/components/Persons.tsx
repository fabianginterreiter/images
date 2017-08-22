import * as $ from "jquery";
import * as React from "react";
import { Link } from "react-router";
import Ajax from "../libs/Ajax";
import NavigationsStore from "../stores/NavigationsStore";
import {Person} from "../types/types";
import { DialogStore, ExtendedTable, Quickedit, sort } from "../utils/Utils";

interface PersonsComponentProps {

}

interface PersonsComponentState {
  persons: Person[];
  edit: number;
}

export default class PersonsComponent extends React.Component<PersonsComponentProps, PersonsComponentState> {
  constructor(props) {
    super(props);

    this.state = {
      persons: [],
      edit: 0
    };
  }

  componentDidMount() {
    Ajax.get("/api/persons").then((persons) => this.setState({persons}));
  }

  componentWillUnmount() {
  }

  private handleEdit(person: Person) {
    this.setState({
      edit: person.id
    })
  }

  private handleChange(person: Person, value: string) {
    this.setState({
      edit: 0
    })

    if (person.name === value) {
      return this.forceUpdate();
    }

    person.name = value;

    Ajax.put("/api/persons/" + person.id, person).then(() => {
      this.forceUpdate();
    });
  }

  private handleCancel() {
    this.setState({
      edit: 0
    })
  }

  private handleDelete(person: Person) {
    DialogStore.open("Delete Person", "Do you really want to delete the Person?", {
      type: "warning",
      icon: "fa fa-trash"
    }).then(() => Ajax.delete("/api/persons/" + person.id)).then(() => {
      for (let index = 0; index < this.state.persons.length; index++) {
        if (this.state.persons[index].id === person.id) {
          this.state.persons.splice(index, 1);
          break;
        }
      }
      this.forceUpdate();
      NavigationsStore.load();
    }).catch((e) => console.log(e));
  }

  private _renderText(person: Person) {
    if (person.id === this.state.edit) {
      return (<Quickedit
        value={person.name}
        onChange={(value) => this.handleChange(person, value)}
        onCancel={() => this.handleCancel()} />);
    }

    return (<Link to={`/images/persons/${person.id}`}>{person.name}</Link>);
  }

  private _renderRow(person: Person) {
    return (<tr key={person.id}>
      <td>{this._renderText(person)}</td>
      <td>{person.count}</td>
      <td onClick={this.handleEdit.bind(this, person)} className="option"><i className="fa fa-pencil-square-o" /></td>
      <td onClick={this.handleDelete.bind(this, person)} className="option"><i className="fa fa-trash-o" /></td>
    </tr>);
  }

  private order(name: string, asc: boolean) {
    sort(this.state.persons, name, asc).then((persons) => this.setState({
      persons
    }));
  }

  render() {
    return (<div className="settings">
      <h1><i className="fa fa-users" aria-hidden="true" /> Persons</h1>
      <ExtendedTable columns={[
        {title: "Name", name: "name"},
        {title: "Images", name: "count", className: "option"},
        {title: "Edit", className: "option"},
        {title: "Delete", className: "option"}]} data={this.state.persons} render={this._renderRow.bind(this)} order={this.order.bind(this)} name={"name"} asc={true} />
    </div>);
  }
}
