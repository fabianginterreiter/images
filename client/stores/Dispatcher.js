class Dispatcher {
  constructor(playload) {
    this.lastId = 0;
    this._callbacks = [];
    this._payload = playload;
  }

  addChangeListener(callback) {
    var id = 'd' + (++this.lastId);
    this._callbacks[id] = callback;
    return id;
  }

  removeChangeListener(id) {
    delete this._callbacks[id];
  }

  dispatch() {
    var payload = this.getObject();
    for (var id in this._callbacks) {
      this._callbacks[id](payload);
    }
  }

  setObject(payload) {
    this._payload = payload;
    this.dispatch();
  }

  getObject() {
    return this._payload;
  }
}

module.exports = Dispatcher;