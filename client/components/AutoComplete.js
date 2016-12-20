var React = require('react');

class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      tags: []
    }
  }

  handleChange(event) {
    let value = event.target.value;
    this.setState({
      value: value
    });

    if (value.length > 2) {
      fetch(this.props.service + '?q=' + value + '%').then((result) => result.json()).then((tags) => this.setState({
        tags:tags
      }));
    } else {
      this.setState({
        tags:[]
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.onSelect) {
      this.props.onSelect({
        name: this.state.value
      });
    }
  }

  handleSelect(tag) {
    if (this.props.onSelect) {
      this.props.onSelect(tag);
    }
  }

  render() {
    var tags = (<span />);
    if (this.state.tags.length > 0) {
      tags = (<div>
          <ul>
            {
              this.state.tags.map((tag, idx) => (
                <li key={tag.id} onClick={this.handleSelect.bind(this, tag)}>{tag.name}</li>
              ))
            }
          </ul>
        </div>);
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" value={this.state.value} onChange={this.handleChange.bind(this)} />
          {tags}
        </form>
      </div>
    );
  }
}

module.exports = AutoComplete;