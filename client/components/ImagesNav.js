var React = require('react');

const SelectAll = require('./SelectAll');

class ImagesNav extends React.Component {
  render() {
    return (
      <nav className="group">
        <SelectAll />
        {this.props.children}
      </nav>
    );
  }
}

module.exports = ImagesNav;