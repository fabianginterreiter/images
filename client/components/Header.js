"use strict"

import React from 'react'
import $ from 'jquery'
import Options from '../components/Options'

import UploadStore from '../stores/UploadStore'
import Title from './Title'
import Searchbar from './Searchbar'
import NavigationsState from '../states/NavigationsState'

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    $("#fileSelect").click();
  }

  handleFileSelect(event) {
    UploadStore.setFiles(event.target.files);
  }

  render() {
    return (
      <header>
        <div className="title" onClick={NavigationsState.open.bind(NavigationsState)}>
          <Title />
        </div>

        <nav>
          <Options />
          <a className="right" onClick={this.handleClick.bind(this)}>
            <input type="file" name="images" multiple="multiple" id="fileSelect" style={{display:'none'}} onChange={this.handleFileSelect.bind(this)} />
            <i className="fa fa-cloud-upload" /><span className="min500"> Upload</span>
          </a>
          <Searchbar />
        </nav>
      </header>
    );
  }
}

module.exports = Header;