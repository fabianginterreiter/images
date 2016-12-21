"use strict"

const React = require('react');
const KeyUpListener = require('../stores/KeyUpListener');
const $ = require("jquery");

class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      tags: [],
      focus: false,
      index: -1
    }
  }

  componentWillReceiveProps() {
    this.setState({
    });
  }

  componentDidMount() {
    KeyUpListener.addChangeListener(this, this.handleKeyUp.bind(this));
  }

  componentWillUnmount() {
    KeyUpListener.removeChangeListener(this);
  }

  handleKeyUp(event) {
    switch (event.keyCode) {
      case 27: {
        this.refs.input.blur();
        break;
      }
      case 38: {
        if (this.state.index > 0) {
          var newIndex = this.state.index - 1;
          this.setState({
            index: newIndex,
            value: this.state.tags[newIndex].name
          });
        }
        break;
      }
      case 40: {
        if (this.state.index < this.state.tags.length - 1) {
          var newIndex = this.state.index + 1;
          this.setState({
            index: newIndex,
            value: this.state.tags[newIndex].name
          });
        }
        break;
      }
    }
  }

  contains(tags, tag) {
    for (var index = 0; index < tags.length; index++) {
      if (tags[index].name === tag.name) {
        return true;
      }
    }
    return false;
  }

  handleChange(event) {
    let value = event.target.value;
    this.setState({
      value: value
    });

    if (value.length > 2) {
      fetch(this.props.service + '?q=' + value + '%').then((result) => result.json()).then((result) => {
        var tags = [];

        result.forEach((tag) => {
          if (!this.contains(this.props.ignore, tag)) {
            tags.push(tag);  
          }
        });

        this.setState({
          tags:tags,
          index: -1
        })
      });
    } else {
      this.setState({
        tags:[],
        index: -1
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.onSelect) {
      if (this.marked) {
        this.props.onSelect(this.marked);
      } else {
        this.props.onSelect({
          name: this.state.value
        });  
      }

      this.setState({
        value: '',
        tags: '',
        index: -1
      });
    }
  }

  handleSelect(tag) {
    if (this.props.onSelect) {
      this.props.onSelect(tag);
    }
  }

  handleFocus() {
    this.setState({
      focus: true
    })
  }

  handleBlur() {
    this.setState({
      focus: false,
      value: '',
      tags: []
    })
  }

  getMenuClassName(tag) {
    if (this.marked) {
      return;
    }

    if (this.state.index > -1) {
      if (this.state.tags[this.state.index].id === tag.id) {
        this.marked = tag;
        return 'select';
      }
    }

    if (tag.name.toUpperCase() === this.state.value.toUpperCase()) {
      this.marked = tag;
      return 'marked';
    }
  }

  render() {
    this.marked = null;

    var className='';

    if (this.contains(this.props.ignore, {
      name: this.state.value
    })) {
      className += 'marked';
    }

    var tags = (<span />);
    if (this.state.focus && this.state.tags.length > 0) {
      var style = {
        top: $(this.refs.box).height()
      }

      tags = (
          <ul style={style}>
            {
              this.state.tags.map((tag, idx) => (
                <li key={tag.id} onClick={this.handleSelect.bind(this, tag)} className={this.getMenuClassName(tag)}>{tag.name}</li>
              ))
            }
          </ul>);
    }

    return (
      <div className="autocomplete" ref="box">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input className={className} 
            type="text"
            ref="input"
            value={this.state.value} 
            onChange={this.handleChange.bind(this)} 
            onFocus={this.handleFocus.bind(this)} 
            onBlur={this.handleBlur.bind(this)} 
            placeholder={this.props.placeholder} />
          {tags}
        </form>
      </div>
    );
  }
}

module.exports = AutoComplete;