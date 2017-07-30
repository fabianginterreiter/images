"use strict"

import * as React from 'react'
import * as $ from 'jquery'
import { Link } from 'react-router'
import Ajax from '../libs/Ajax'
import NavigationsStore from '../stores/NavigationsStore'
import * as moment from 'moment'

class Dates extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dates: []
    }
  }

  componentDidMount() {
    Ajax.get('/api/images/dates').then((dates) => this.setState({dates:dates}));
  }

  componentWillUnmount() {
  }

  render() {
    return (<div className="settings">
      <h1><i className="fa fa-calendar" aria-hidden="true" /> Dates</h1>
      <ul>{this.state.dates.map((date) => (
        <li key={date.year}>
          <Link to={`/images/dates/${date.year}`}>{date.year} ({date.count})</Link>
          <ul>{date.months.map((month) => (
            <li key={date.year + '' + month.month}>
              <Link to={`/images/dates/${date.year}/${month.month}`}>{moment().month(month.month-1).format('MMMM')} ({month.count})</Link>
              <ul>{month.days.map((day) => (
                <li key={date.year + '' + month.month + '' + day.day}>
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

export default Dates;
