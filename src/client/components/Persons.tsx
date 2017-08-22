import * as $ from "jquery";
import * as React from "react";
import { Link } from "react-router";
import Ajax from "../libs/Ajax";
import NavigationsStore from "../stores/NavigationsStore";
import {Person} from "../types/types";
import { DialogStore, ExtendedTable, Quickedit, sort } from "../utils/Utils";
import * as ReactRedux from "react-redux";
import {sortPersons, savePerson, deletePerson} from "../actions";

interface PersonsComponentProps {
  persons: Person[];
  sort(key:string, asc: boolean);
  save(person: Person);
  delete(person: Person);
}

interface PersonsComponentState {
  edit: number;
}

class PersonsComponent extends React.Component<PersonsComponentProps, PersonsComponentState> {
  constructor(props) {
    super(props);

    this.state = {
      edit: 0
    };
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

    this.props.save(person);
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
    }).then(() => this.props.delete(person));
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
    this.props.sort(name, asc);
  }

  render() {
    return (<div className="settings">
      <h1><i className="fa fa-users" aria-hidden="true" /> Persons</h1>
      <ExtendedTable columns={[
        {title: "Name", name: "name"},
        {title: "Images", name: "count", className: "option"},
        {title: "Edit", className: "option"},
        {title: "Delete", className: "option"}]} data={this.props.persons} render={this._renderRow.bind(this)} order={this.order.bind(this)} name={"name"} asc={true} />
    </div>);
  }
}

const mapStateToProps = (state) => {
  return {
    persons: state.persons
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sort: (key:string, asc:boolean) => dispatch(sortPersons(key, asc)),
    save: (person: Person) => dispatch(savePerson(person)),
    delete: (person: Person) => dispatch(deletePerson(person))
  }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PersonsComponent);
