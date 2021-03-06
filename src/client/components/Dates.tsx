import * as moment from "moment";
import * as React from "react";
import { Link } from "react-router";
import Ajax from "../libs/Ajax";
import {t} from "../libs/Translation";

interface Day {
  day: number;
  count: number;
}

interface Month {
  month: number;
  count: number;
  days: Day[];
}

export interface Year {
  year: number;
  count: number;
  months: Month[];
}

interface DatesState {
  dates: Year[];
}

export default class Dates extends React.Component<{}, DatesState> {
  constructor(props) {
    super(props);

    this.state = {
      dates: []
    };
  }

  public componentDidMount() {
    Ajax.get("/api/images/dates").then((dates) => this.setState({dates}));
  }

  public render() {
    return (<div className="settings">
      <h1><i className="fa fa-calendar" aria-hidden="true" /> Dates</h1>
      <ul>{this.state.dates.map((date) => (
        <li key={date.year}>
          <Link to={`/images/dates/${date.year}`}>{date.year} ({date.count})</Link>
          <ul>{date.months.map((month) => (
            <li key={date.year + "" + month.month}>
              <Link to={`/images/dates/${date.year}/${month.month}`}>
                {t(`months.${month.month}`)} ({month.count})
              </Link>
              <ul>{month.days.map((day) => (
                <li key={date.year + "" + month.month + "" + day.day}>
                  <Link to={`/images/dates/${date.year}/${month.month}/${day.day}`}>{day.day} ({day.count})</Link>
                </li>))}
              </ul>
            </li>))}
          </ul>
        </li>))}
      </ul>
    </div>);
  }
}
