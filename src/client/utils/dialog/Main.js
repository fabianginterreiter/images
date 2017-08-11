import * as React from 'react'
import Dialog from './Dialog'
import SelectDialog from './SelectDialog'
import SingleSelectDialog from './SingleSelectDialog'

class Main extends React.Component {
  render() {
    return (
      <div>
        <Dialog />
        <SelectDialog />
        <SingleSelectDialog />
      </div>
    );
  }
}

export default Main;
