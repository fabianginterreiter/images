import * as $ from "jquery";
import {ExtendedFile, Image} from "../types/types";
import {Dispatcher} from "../utils/Utils";

export default class Upload {
  private active: boolean;
  private canceled: boolean;
  private index: number;
  private files: ExtendedFile[];
  private extCompleteHandler: (file: ExtendedFile, image: Image) => void;
  private extStartedHandler: (file: ExtendedFile) => void;
  private extErrorHandler: (file: ExtendedFile) => void;
  private extProgressHandler: (file: ExtendedFile, progress: number) => void;

  public isUploading(): boolean {
    return this.active;
  }

  public upload(files: ExtendedFile[]) {
    this.files = files;
    this.canceled = false;
    this.index = 0;
    this.active = true;
    this._upload(0);
  }

  public cancel() {
    this.canceled = true;
  }

  public setCompleteHandler(completeHandler) {
    this.extCompleteHandler = completeHandler;
  }

  public setErrorHandler(errorHandler) {
    this.extErrorHandler = errorHandler;
  }

  public setProgressHandler(progressHandler) {
    this.extProgressHandler = progressHandler;
  }

  public setStartedHandler(startedHandler) {
    this.extStartedHandler = startedHandler;
  }

  private completeHandler(image: Image) {
    if (this.extCompleteHandler) {
      this.extCompleteHandler(this.files[this.index], image);
    }

    this.index++;
    this._upload(this.index);
  }

  private beforeSendHandler(e) {
    if (this.extStartedHandler) {
      this.extStartedHandler(this.files[this.index]);
    }
  }

  private errorHandler() {
    if (this.extErrorHandler) {
      this.extErrorHandler(this.files[this.index]);
    }
  }

  private _upload(index) {
    if (!(index < this.files.length) || this.canceled) {
      this.active = false;
      return;
    }

    const formData = new FormData();
    formData.append("image", this.files[index].file);

    $.ajax({
      url: "/api/images",
      type: "POST",
      xhr: () => {
        const myXhr = $.ajaxSettings.xhr();
        if (myXhr.upload) {
          myXhr.upload.addEventListener("progress", this.progressHandlingFunction.bind(this), false);
        }
        return myXhr;
      },
      beforeSend: this.beforeSendHandler.bind(this),
      success: this.completeHandler.bind(this),
      data: formData,
      cache: false,
      contentType: false,
      processData: false
    });
  }

  private progressHandlingFunction(e) {
    if (e.lengthComputable && this.extProgressHandler) {
      const max = e.total;
      const current = e.loaded;

      const percentage = (current * 100) / max;

      this.extProgressHandler(this.files[this.index], percentage);
    }
  }
}
