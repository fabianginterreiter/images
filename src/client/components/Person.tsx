import * as React from "react";
import {connect} from "react-redux";
import {loadImages} from "../actions";
import Ajax from "../libs/Ajax";
import ImagesStore from "../stores/ImagesStore";
import {Image, Person} from "../types/types";
import Images from "./Images";
import ImagesNav from "./ImagesNav";

interface PersonComponentProps {
  params: {
    id: string;
  };
  images: Image[];
  person: Person;
}

class PersonComponent extends React.Component<PersonComponentProps, {}> {
  public render() {
    if (!this.props.person) {
      return <span />;
    }

    return (
      <div>
        <h1>
          <i className="fa fa-user" aria-hidden="true" /> {this.props.person.name}
          <ImagesNav />
        </h1>
        <Images images={this.props.images} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    images: state.images,
    person: state.persons.find((person) => person.id === parseInt(ownProps.params.id, 10))
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  dispatch(loadImages(`/api/images?person=${ownProps.params.id}`));
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonComponent);
