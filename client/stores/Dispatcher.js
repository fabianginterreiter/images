var __next_objid=0;

class Dispatcher {
  constructor(playload) {
    this._callbacks = {};
    this._payload = playload;
  }

  _objectId(object) {
    if (object == null) {
      return null;
    }

    if (object.__obj_id == null) {
      object.__obj_id = ++__next_objid;
    }
    return object.__obj_id;
  }

  addChangeListener(object, callback) {
    var id = this._objectId(object);
    console.log('Add Listener to ' + this.constructor.name + ': ' + object.constructor.name + ' ID: ' + id);
    this._callbacks[id] = callback;
    return id;
  }

  removeChangeListener(object) {
    var id = this._objectId(object);
    delete this._callbacks[id];
    console.log('Remove Listener to ' + this.constructor.name + ': ' + object.constructor.name + ' ID: ' + id);
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