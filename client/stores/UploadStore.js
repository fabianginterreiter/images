"use strict"

import Utils from '../utils/Utils';
import $ from 'jquery'

class UploadStore extends Utils.Dispatcher {
  constructor() {
    super([]);
    this._active = false;
  }

  setFiles(list) {
    var files = [];

    for (var index = 0; index < list.length; index++) {
      var file = list[index];
      super.getObject().push({
        name: file.name,
        file: file
      });
    }

    super.dispatch();
  }

  isUploading() {
    return this._active;
  }

  completeHandler(image) {
    super.getObject()[this._index].complete = true;
    super.getObject()[this._index].image = image;
    super.dispatch();
    this._index++;
    this._upload(this._index);
  }

  beforeSendHandler(e) {
    super.getObject()[this._index].complete = false;
    super.getObject()[this._index].process = 0;
    super.getObject()[this._index].started = true;
    super.dispatch();
  }

  errorHandler() {
    super.getObject()[this._index].complete = false;
    super.getObject()[this._index].error = true;
  }

  _upload(index) {
    if (!(index < super.getObject().length) || this._canceled) {
      this._active = false;
      super.dispatch();
      return;
    }

    var formData = new FormData();
    formData.append('image', super.getObject()[index].file);

    $.ajax({
      url: '/api/images',
      type: 'POST',
      xhr: function() {
        var myXhr = $.ajaxSettings.xhr();
        if(myXhr.upload){
          myXhr.upload.addEventListener('progress',this.progressHandlingFunction.bind(this), false);
        }
        return myXhr;
      }.bind(this),
      beforeSend: this.beforeSendHandler.bind(this),
      success: this.completeHandler.bind(this),
      data: formData,
      cache: false,
      contentType: false,
      processData: false
    });
  }

  progressHandlingFunction(e) {
    if(e.lengthComputable) {
      var max = e.total;
      var current = e.loaded;

      var Percentage = (current * 100)/max;

      super.getObject()[this._index].process = Percentage;
      super.dispatch();
    }  
  }

  upload() {
    this._canceled = false;
    this._index = 0;
    this._active = true;
    this._upload(0);
  }

  cancel() {
    this._canceled = true;
  }
}

module.exports = new UploadStore();