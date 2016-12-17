var React = require('react');
var cookie = require('react-cookie');

class OptionsList extends React.Component {
  toggleMenu(option) {
    option.open = !option.open;

    cookie.save('menu_' + option.key, option.open.toString());

    this.forceUpdate();
  }

  handleClick(e, options) {
    if(e.target.tagName !== 'LI') {
      return;
    }

    if (this.props.onClick) {
      this.props.onClick(options);
    }
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
          var badge = (<span />);
          if (option.options && option.options.length) {
            if (option.open) {
              badge = (<div className="badge" onClick={this.toggleMenu.bind(this, option)}><i className="icon-chevron-down" /></div>);  
            } else {
              badge = (<div className="badge" onClick={this.toggleMenu.bind(this, option)}><i className="icon-chevron-up" /></div>);  
            }
          }

          if (this.props.selected && this.props.selected(option)) {
            elements.push(<li key={option.key} className={className + ' selected'} onClick={(e) => this.handleClick(e, option)} style={style}>{option.name}{badge}</li>)  
          }
          else if (!this.props.active || this.props.active(option)) {
            elements.push(<li key={option.key} className={className + ' action'} onClick={(e) => this.handleClick(e, option)} style={style}>{option.name}{badge}</li>)  
          } else {
            elements.push(<li key={option.key} className={className + ' action disabled'} style={style}>{option.name}{badge}</li>)
          }
          break;
        case 'menu':
          if (option.open) {
            badge = (<div className="badge"><i className="icon-chevron-down" /></div>);  
          } else {
            badge = (<div className="badge"><i className="icon-chevron-up" /></div>);  
          }

          elements.push(<li key={option.key} className={className + ' action'} onClick={this.toggleMenu.bind(this, option)} style={style}>{option.name}{badge}</li>);
      }

      if (option.options && option.options.length > 0) {
        if (!option.open && cookie.load('menu_' + option.key) === 'true') {
          option.open = true;
        }

        if (option.open) {
          this._renderOptions(elements, option.options, deep + 1);
        }
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