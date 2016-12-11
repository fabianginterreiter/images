var React = require('react');
var cookie = require('react-cookie');

class OptionsList extends React.Component {
  toggleMenu(option) {
    option.open = !option.open;

    cookie.save('menu_' + option.key, option.open.toString());

    this.forceUpdate();
  }

  _renderOptions(elements, values, deep) {

    var style = {
      paddingLeft: 10 + deep * 20 + 'px'
    }

    values.map(function(option, idx) {
      var className = option.className ? option.className : '';

      switch (option.type) {
        case 'divider':
          elements.push(<li key={'divider' + idx} className={className + ' divider'} style={style} />);
          break;
        case 'action':
          if (this.props.selected && this.props.selected(option)) {
            elements.push(<li key={option.key} className={className + ' selected'} onClick={this.props.onClick.bind(this, option)} style={style}>{option.name}</li>)  
          }
          else if (!this.props.active || this.props.active(option)) {
            elements.push(<li key={option.key} className={className + ' action'} onClick={this.props.onClick.bind(this, option)} style={style}>{option.name}</li>)  
          } else {
            elements.push(<li key={option.key} className={className + ' action disabled'} style={style}>{option.name}</li>)
          }
          break;
        case 'menu':
          elements.push(<li key={option.key} className={className + ' action'} onClick={this.toggleMenu.bind(this, option)} style={style}>{option.name}</li>);

          if (!option.open && cookie.load('menu_' + option.key) === 'true') {
            option.open = true;
          }

          if (option.open) {
            this._renderOptions(elements, option.options, deep + 1);
          }
          
          break;
      }
    }.bind(this));

    return elements;
  }

  render() {
    var options = this._renderOptions([], this.props.values, 0);
    
    return (
      <ul className="options">
        {options}
      </ul>
    );
  }
}

module.exports = OptionsList;