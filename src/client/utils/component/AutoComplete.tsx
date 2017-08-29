import * as $ from "jquery";
import * as React from "react";
import KeyUpListener from "../listener/KeyUpListener";

interface AutoCompleteProps {
  focus?: boolean;
  service: string;
  placeholder: string;
  ignore: Element[];
  onBlur?(event): void;
  onSelect(object: Element): void;
}

interface Element {
  id?: number;
  name: string;
}

interface AutoCompleteState {
  index: number;
  value: string;
  tags: Element[];
  focus: boolean;
}

export default class AutoComplete extends React.Component<AutoCompleteProps, AutoCompleteState> {
  private marked: Element;

  constructor(props: AutoCompleteProps) {
    super(props);
    this.state = {
      value: "",
      tags: [],
      focus: false,
      index: -1
    };
  }

  public render() {
    this.marked = null;

    let className = "";

    if (this.contains(this.props.ignore, {
      name: this.state.value
    })) {
      className += "marked";
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
            {this.__renderTags()}
        </form>
      </div>
    );
  }

  public componentWillReceiveProps() {
    this.setState({
    });
  }

  public componentDidMount() {
    KeyUpListener.addChangeListener(this, this.handleKeyUp.bind(this));

    if (this.props.focus) {
      (this.refs.input as HTMLInputElement).focus();
    }
  }

  public componentWillUnmount() {
    KeyUpListener.removeChangeListener(this);
  }

  private handleKeyUp(event: KeyboardEvent) {
    switch (event.keyCode) {
      case 27: {
        (this.refs.input as HTMLInputElement).blur();
        break;
      }
      case 38: {
        if (this.state.index > 0) {
          const newIndex = this.state.index - 1;
          this.setState({
            index: newIndex,
            value: this.state.tags[newIndex].name
          });
        }
        break;
      }
      case 40: {
        if (this.state.index < this.state.tags.length - 1) {
          const newIndex = this.state.index + 1;
          this.setState({
            index: newIndex,
            value: this.state.tags[newIndex].name
          });
        }
        break;
      }
    }
  }

  private contains(tags, tag) {
    return tags.find((t) => t.name === tag.name);
  }

  private handleChange(event) {
    const value = event.target.value;
    this.setState({
      value
    });

    if (value.length > 1) {
      fetch(this.props.service + "?q=" + value + "%").then((result) => result.json()).then((result) => {
        const tags = [];

        result.forEach((tag) => {
          if (!this.contains(this.props.ignore, tag)) {
            tags.push(tag);
          }
        });

        this.setState({
          tags,
          index: -1
        });
      });
    } else {
      this.setState({
        tags: [],
        index: -1
      });
    }
  }

  private handleSubmit(e) {
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
        value: "",
        tags: [],
        index: -1
      });
    }
  }

  private handleSelect(tag) {
    if (this.props.onSelect) {
      this.props.onSelect(tag);
    }
  }

  private handleFocus(): void {
    KeyUpListener.take(this);

    this.setState({
      focus: true
    });
  }

  private handleBlur(event): void {
    KeyUpListener.release(this);

    setTimeout(() => {
      this.setState({
        focus: false,
        value: "",
        tags: []
      });

      if (this.props.onBlur) {
        this.props.onBlur(event);
      }
    }, 100);
  }

  private getMenuClassName(tag) {
    if (this.marked) {
      return;
    }

    if (this.state.index > -1) {
      if (this.state.tags[this.state.index].id === tag.id) {
        this.marked = tag;
        return "select";
      }
    }

    if (tag.name.toUpperCase() === this.state.value.toUpperCase()) {
      this.marked = tag;
      return "marked";
    }
  }

  private __renderTags() {
    if (!this.state.focus || this.state.tags.length === 0) {
      return (<span />);
    }

    const style = {
      top: $(this.refs.box).height()
    };

    return (
      <ul style={style}>
        {
          this.state.tags.map((tag) => (
            <li key={tag.id}
              onClick={this.handleSelect.bind(this, tag)}
              className={this.getMenuClassName(tag)}>{tag.name}</li>
          ), this)
        }
      </ul>);
  }
}
