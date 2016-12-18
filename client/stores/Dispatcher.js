var __next_objid=1;


class Dispatcher {
  constructor(playload) {
    this._callbacks = [];
    this._payload = playload;
  }

  _objectId(object) {
    if (object==null) {
      return null;
    }

    if (object.__obj_id === null) {
      object.__obj_id = ++__next_objid;
    }
    return object.__obj_id;
  }

  addChangeListener(object, callback) {
    var id = this._objectId(object);
    this._callbacks[id] = callback;
    return id;
  }

  removeChangeListener(object) {
    delete this._callbacks[this._objectId(object)];
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