"use strict"

const React = require('react');
const Dialog = require('./Dialog');
const SelectDialog = require('./SelectDialog');
const SingleSelectDialog = require('./SingleSelectDialog');

class Main extends React.Component {
  render() {
    return (
      <div>
        <Dialog />
        <SelectDialog />
        <SingleSelectDialog />
      </div>
    );
  }
}

module.exports = Main;