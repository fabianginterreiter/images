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

  _isOptionVisible(option, open) {
    if (this.props.query) {
      if (this.props.query.length > 0) {
        if (option.name && option.name.length > 0) {
          return option.name.toUpperCase().startsWith(this.props.query.toUpperCase());
        }
        return false;
      }
    }

    return open;
  }

  _renderName(name) {
    if (this.props.query && this.props.query.length > 0 && name.toUpperCase().startsWith(this.props.query.toUpperCase())) {
      return (<span><span className="selected">{name.substring(0, this.props.query.length)}</span>{name.substring(this.props.query.length)}</span>);
    }
    return name;
  }

  _renderOptions(elements, values, deep, open) {

    var style = {
      paddingLeft: 10 + deep * 20 + 'px'
    }

    values.map(function(option, idx) {
      var className = option.className ? option.className : '';

      if (deep === 0 || this._isOptionVisible(option, open)) {
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
              elements.push(<li key={option.key} className={className + ' selected'} onClick={(e) => this.handleClick(e, option)} style={style}>{this._renderName(option.name)}{badge}</li>)  
            }
            else if (!this.props.active || this.props.active(option)) {
              elements.push(<li key={option.key} className={className + ' action'} onClick={(e) => this.handleClick(e, option)} style={style}>{this._renderName(option.name)}{badge}</li>)  
            } else {
              elements.push(<li key={option.key} className={className + ' action disabled'} style={style}>{this._renderName(option.name)}{badge}</li>)
            }
            break;
          case 'menu':
            if (option.open) {
              badge = (<div className="badge"><i className="icon-chevron-down" /></div>);  
            } else {
              badge = (<div className="badge"><i className="icon-chevron-up" /></div>);  
            }

            elements.push(<li key={option.key} className={className + ' action'} onClick={this.toggleMenu.bind(this, option)} style={style}>{this._renderName(option.name)}{badge}</li>);
        }
      }

      if (option.options && option.options.length > 0) {
        if (!option.open && cookie.load('menu_' + option.key) === 'true') {
          option.open = true;
        }

        this._renderOptions(elements, option.options, deep + 1, option.open && open);
      }
    }.bind(this));

    return elements;
  }

  render() {
    var options = this._renderOptions([], this.props.values, 0, true);
    
    return (
      <ul className="options">
        {options}
      </ul>
    );
  }
}

module.exports = OptionsList;