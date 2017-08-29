let __next_objid = 0;

export default class Dispatcher<T> {
  private callbacks;
  private payload;
  private takeover;

  constructor(playload: T) {
    this.callbacks = {};
    this.payload = playload;
    this.takeover = null;
  }

  private _objectId(object) {
    if (object == null) {
      return null;
    }

    if (object.__obj_id == null) {
      object.__obj_id = ++__next_objid;
    }
    return object.__obj_id;
  }

  public addChangeListener(object, callback: (obj: T) => void): number {
    const id = this._objectId(object);
    this.callbacks[id] = callback;
    return id;
  }

  public removeChangeListener(object) {
    const id = this._objectId(object);
    delete this.callbacks[id];
  }

  public dispatch() {
    const payload: T = this.getObject();

    if (this.takeover && this.callbacks[this.takeover]) {
      return this.callbacks[this.takeover](payload);
    }

    for (const id in this.callbacks) {
      this.callbacks[id](payload);
    }
  }

  public setObject(payload: T) {
    this.payload = payload;
    this.dispatch();
  }

  public getObject(): T {
    return this.payload;
  }

  public take(object) {
    if (this.takeover) {
      return;
    }

    if (!object.__obj_id) {
      return;
    }

    if (!this.callbacks[object.__obj_id]) {
      return;
    }

    this.takeover = object.__obj_id;
  }

  public release(object) {
    if (this.takeover === object.__obj_id) {
      this.takeover = null;
    }
  }
}
