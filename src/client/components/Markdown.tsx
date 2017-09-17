import * as React from "react";
const a = (match, name, href) => `<a href="${href}">${name}</a>`;
const bold = (match, text) => `<b>${text}</b>`;
const italic = (match, text) => `<i>${text}</i>`;
const underline = (match, text) => `<u>${text}</u>`;
const cancelled = (match, text) => `<s>${text}</s>`;
const h1 = (match, text) => `<h1>${text}</h1>`;
const h2 = (match, text) => `<h2>${text}</h2>`;
const h3 = (match, text) => `<h3>${text}</h3>`;
const h4 = (match, text) => `<h4>${text}</h4>`;
const hr = () => "<hr />";
const hrFat = () => `<hr class="fat" />`;

class Markdown extends React.Component<{
  edit?: boolean;
  value: string;
  onChange?(value: string): void;
}, {
  value: string;
}> {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  public componentWillReceiveProps(newProps) {
    this.setState({
      value: newProps.value
    });
  }

  public render() {
    const text = this.format(this.state.value);
    return <div className="markdown">
      <div dangerouslySetInnerHTML={ {__html: text} } />
      {this.props.edit && <div className="textbox"><textarea defaultValue={this.state.value} rows={5}
        onChange={(event) => this.handleChange(event)}
        onBlur={() => this.props.onChange(this.state.value)} /></div>}
    </div>;
  }

  private format(value: string) {
    if (!value || value.length === 0) {
      return "<br>";
    }

    let text = value;

    text = text.replace(/\*{2}(.+)\*{2}/g, bold);
    text = text.replace(/\*{1}([^\*]+)\*{1}/g, italic);
    text = text.replace(/\[([^\[^\]]+)\]\((.+)\)/g, a);
    text = text.replace(/_{1}([^_]+)_{1}/g, underline);
    text = text.replace(/-{1}([^-]+)-{1}/g, cancelled);

    text = text.replace(/####\s([^\n]+)/g, h4);
    text = text.replace(/###\s([^\n]+)/g, h3);
    text = text.replace(/##\s([^\n]+)/g, h2);
    text = text.replace(/#\s([^\n]+)/g, h1);

    text = text.replace(new RegExp("\n", "g"), "<br>");

    text = text.replace(/-{3,}/g, hr);
    text = text.replace(/={3,}/g, hrFat);

    return `<span>${text}&nbsp;</span>`;
  }

  private handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }
}

export default Markdown;
