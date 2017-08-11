import Dispatcher from '../Dispatcher'
import * as $ from 'jquery'

class KeyUpListener extends Dispatcher {
  constructor() {
    super(null);

    $(document).keyup(this.setObject.bind(this));
  }

}

export default new KeyUpListener();
