"use strict"

const React = require('react');
const $ = require("jquery");
const Link = require('react-router').Link;
const Quickedit = require('./Quickedit');
const DialogStore = require('../stores/DialogStore');
const NavigationsStore = require('../stores/NavigationsStore');

class Dates extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dates: []
    }
  }

  componentDidMount() {
    fetch('/api/images/dates').then((result) => result.json()).then((dates) => this.setState({dates:dates}));
  }

  componentWillUnmount() {
  }

  render() {
    return (<div className="settings">
      <h1>Dates</h1>
      <ul>{this.state.dates.map((date) => (
        <li key={date.year}>
          <Link to={`/images/dates/${date.year}`}>{date.year} ({date.count})</Link>
          <ul>{date.months.map((month) => (
            <li key={date.year + '' + month.month}>
              <Link to={`/images/dates/${date.year}/${month.month}`}>{month.month} ({month.count})</Link>
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

module.exports = Dates;