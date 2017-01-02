"use strict"

const React = require('react');
const Cookies = require('../stores/Cookies');
const Link = require('react-router').Link;

class OptionsList extends React.Component {
  toggleMenu(event, option) {
    option.open = !option.open;
    Cookies.set('menu_' + option.key, option.open.toString());
    this.forceUpdate();
  }

  handleClick(e, options) {
    if(e.target.className === 'badge' || e.target.parentNode.className === 'badge') {
      return this.toggleMenu(e, options);
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
      return (<a><span><span className="selected">{name.substring(0, this.props.query.length)}</span>{name.substring(this.props.query.length)}</span></a>);
    }
    return (<a>{name}</a>);
  }

  _renderItem(option, idx, deep) {
    var className = option.className ? option.className : '';

    var style = {
      paddingLeft: 10 + deep * 20 + 'px'
    }

    switch (option.type) {
      case 'divider':
        return (<li key={'divider' + idx} className={className + ' divider'} style={style} />);
      case 'action':
        var badge = (<span />);
        if (option.options && option.options.length) {
          if (option.open) {
            badge = (<div className="badge"><i className="icon-chevron-down" /></div>);  
          } else {
            badge = (<div className="badge"><i className="icon-chevron-up" /></div>);  
          }
        }

        if (this.props.selected && this.props.selected(option)) {
          return (<li key={option.key} className={className + ' selected'} onClick={(e) => this.handleClick(e, option)} style={style}>{this._renderName(option.name)}{badge}</li>)  
        } else if (!this.props.active || this.props.active(option)) {
          return (<li key={option.key} className={className} onClick={(e) => this.handleClick(e, option)} style={style}>{this._renderName(option.name)}{badge}</li>)  
        } else {
          return (<li key={option.key} className={className + ' disabled'} style={style}>{this._renderName(option.name)}{badge}</li>)
        }
      case 'menu':
        if (option.open) {
          badge = (<div className="badge"><i className="icon-chevron-down" /></div>);  
        } else {
          badge = (<div className="badge"><i className="icon-chevron-up" /></div>);  
        }

        return (<li key={option.key} className={className + ' action'} onClick={(event) => this.toggleMenu(event, option)} style={style}>{this._renderName(option.name)}{badge}</li>);
      default:
        return null;
    }
  }

  _renderOptions(elements, values, deep, open) {
    

    values.map(function(option, idx) {
      if (option.options && option.options.length > 0) {
        if (!option.open && Cookies.get('menu_' + option.key) === 'true') {
          option.open = true;
        }
      }

      if (deep === 0 || this._isOptionVisible(option, open)) {
        elements.push(this._renderItem(option, idx, deep));
      }

      if (option.options && option.options.length > 0) {
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