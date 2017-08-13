import * as React from "react"
import Images from "./Images"
import ImagesStore from "../stores/ImagesStore"
import ImagesNav from "./ImagesNav"

interface SearchProps {
  location: {
    query: {
      s: string;
    }
  }
}

interface SearchState {
  search: string;
}

export default class Search extends React.Component<SearchProps, SearchState> {

  constructor(props) {
    super(props);

    this.state = {
      search: ""
    }
  }

  componentDidMount() {
    ImagesStore.load(`/api/search?s=${this.props.location.query.s}`);

    this.setState({
      search: this.props.location.query.s
    })
  }

  componentWillReceiveProps(newProps) {
    ImagesStore.load(`/api/search?s=${newProps.location.query.s}`);

    this.setState({
      search: newProps.location.query.s
    })
  }

  render() {
    return (
      <div>
        <h1>
          <i className="fa fa-search" aria-hidden="true" /> Search: {this.state.search}
          <ImagesNav />
        </h1>
        <Images />
      </div>
    );
  }
}