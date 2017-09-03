import * as moment from "moment";
import * as React from "react";
import * as ReactRedux from "react-redux";
import { browserHistory } from "react-router";
import {closeNavigation, openNavigation, setPinNavigation} from "../actions";
import Ajax from "../libs/Ajax";
import {Album, Image} from "../types";
import { Option } from "../utils/component/OptionsList";
import { OptionsList, Panel } from "../utils/Utils";
import {Year} from "./Dates";
import Title from "./Title";

interface NavigationsProps {
  location: {
    pathname: string;
  };
  open: boolean;
  pinned: boolean;
  albums: Album[];
  trash: Image[];
  closeNavigation(): void;
  setPinNavigation(pin: boolean): void;
}

interface NavigationsState {
  query: string;
  years: Year[];
}

class Navigations extends React.Component<NavigationsProps, NavigationsState> {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      years: []
    };

  }

  public componentDidMount() {
    Ajax.get("/api/images/dates").then((years) => this.setState({years}));
  }

  public componentWillReceiveProps(props) {
    if (this.props.open) {
      this.setState({
        query: ""
      });
    }
  }

  private create(props) {
    const navigations = [];

    navigations.push({
      key: "all",
      type: "action",
      name: "All",
      service: "/api/images",
      link: "/images/",
      fontAwesome: "fa fa-picture-o"
    });

    navigations.push({
      key: "favorites",
      type: "action",
      name: "Favorites",
      service: "/api/images?liked=true",
      link: "/images/favorites",
      fontAwesome: "fa fa-heart-o"
    });

    navigations.push({
      type: "divider"
    });

    if (props.albums.length > 0) {
      const albums = {
        key: "albums",
        type: "action",
        name: "Albums",
        link: "/images/albums",
        fontAwesome: "fa fa-book",
        options: props.albums.map((album) => {
          return {
            key: `album_${album.id}`,
            type: "action",
            name: album.name,
            link: `/images/albums/${album.id}`
          };
        })
      };

      navigations.push(albums);
    }

    if (props.persons.length > 0) {
      const persons = {
        key: "persons",
        type: "action",
        name: "Persons",
        link: "/images/persons",
        fontAwesome: "fa fa-users",
        options: props.persons.map((person) => {
          return {
            key: `person_${person.id}`,
            type: "action",
            name: person.name,
            link: `/images/persons/${person.id}`
          };
        })
      };

      navigations.push(persons);
    }

    if (props.tags.length > 0) {
      const tags = {
        key: "tags",
        type: "action",
        name: "Tags",
        link: "/images/tags",
        fontAwesome: "fa fa-tags",
        options: props.tags.map((tag) => {
          return {
            key: `tag_${tag.id}`,
            type: "action",
            name: tag.name,
            link: `/images/tags/${tag.id}`
          };
        })
      };

      navigations.push(tags);
    }

    navigations.push({
      key: "dates",
      type: "action",
      name: "Dates",
      fontAwesome: "fa fa-calendar",
      link: "/images/dates",
      options: this.state.years.map((year) => {
        return {
          key: "date" + year.year,
          type: "action",
          link: "/images/dates/" + year.year,
          name: year.year,
          options: year.months.map((month) => {
            return {
              key: "date" + year.year + month.month,
              type: "action",
              name: moment().month(month.month - 1).year(year.year).format("MMMM YYYY"),
              link: `/images/dates/${year.year}/${month.month}`
            };
          })
        };
      })
    });

    if (this.props.trash.length > 0) {
      navigations.push({
        type: "divider"
      });

      navigations.push({
        key: "trash",
        type: "action",
        name: "Trash",
        link: "/images/trash",
        fontAwesome: "fa fa-trash-o"
      });
    }

    return navigations;
  }

  private handleClick(option: Option) {
    browserHistory.push(option.link);

    this.props.closeNavigation();
  }

  private handleSearchChange(event) {
    this.setState({
      query: event.target.value
    });
  }

  private isSelected(option: Option) {
    return this.props.location.pathname === option.link;
  }

  public render() {
    const open = (this.props.open || this.props.pinned);

    const clickCatcher = (this.props.open && !this.props.pinned);

    let pinClass = null;
    if (this.props.pinned) {
      pinClass = "fa fa-toggle-on";
    } else {
      pinClass = "fa fa-toggle-off";
    }

    return (
      <Panel open={open} clickCatcher={clickCatcher} onClickCatcherClick={() => this.props.closeNavigation()} side="left" header={true}>
        <div className="title">
          <span onClick={() => this.props.closeNavigation()}><Title /></span>
          <input type="text" onChange={this.handleSearchChange.bind(this)} value={this.state.query} placeholder="Filter" />
          <div className="badge min500" onClick={() => this.props.setPinNavigation(!this.props.pinned)}><i className={pinClass} aria-hidden="true" /></div>
        </div>
        <div style={{clear: "both"}} />
        <div className="body">
          <OptionsList values={this.create(this.props)}
            onClick={this.handleClick.bind(this)}
            selected={this.isSelected.bind(this)}
            query={this.state.query} />
        </div>
      </Panel>);
  }
}

const mapStateToProps = (state) => {
  return {
    open: state.view.open,
    pinned: state.view.pinned,
    albums: state.albums,
    persons: state.persons,
    tags: state.tags,
    trash: state.trash
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openNavigation: () => dispatch(openNavigation()),
    closeNavigation: () => dispatch(closeNavigation()),
    setPinNavigation: (pin: boolean) => dispatch(setPinNavigation(pin))
  };
};

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Navigations);
