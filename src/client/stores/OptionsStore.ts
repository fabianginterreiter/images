import {Dispatcher} from '../utils/Utils';
import cookie from 'react-cookie';

class OptionsStore extends Dispatcher<boolean> {
  constructor() {
    super(false);
  }
}

export default new OptionsStore();
