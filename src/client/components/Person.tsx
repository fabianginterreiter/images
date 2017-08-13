import * as React from "react"
import Images from "./Images"
import ImagesStore from "../stores/ImagesStore"
import ImagesNav from "./ImagesNav"
import Ajax from "../libs/Ajax"
import {Person} from "../types/types";

interface PersonComponentProps {
  params: {
    id: string;
  }
}

interface PersonComponentState {
  person: Person;
}

export default class PersonComponent extends React.Component<PersonComponentProps, PersonComponentState> {

  constructor(props: PersonComponentProps) {
    super(props);

    this.state = {
      person: undefined
    }
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(newProps: PersonComponentProps) {
    ImagesStore.load("/api/images?person=" + newProps.params.id);
    Ajax.get("/api/persons/" + newProps.params.id).then((person) => this.setState({person:person}));
  }

  render() {
    if (!this.state.person) {
      return <span />;
    }

    return (
      <div>
        <h1>
          <i className="fa fa-user" aria-hidden="true" /> {this.state.person.name}
          <ImagesNav />
        </h1>
        <Images />
      </div>
    );
  }
}
