"use strict"

import State from '../states/State'
import cookie from 'react-cookie'

class NavigationsState extends State {
  constructor() {
    var c = cookie.load('pinned') === 'true';

    super({
      open:c,
      pinned: c
    });
  }

  open() {
    this.setState({
      open: true
    });
  }

  close() {
    this.setState({
      open:false
    });
  }

  pin() {
    this.setState({
      pinned: !this.getObject().pinned,
      open:true
    });

    cookie.save('pinned', this.getObject().pinned.toString());
  }
}

module.exports = new NavigationsState();