import React from "react";
import "./layout.less";
import { CandyIframe } from "ui-core/src";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<header>
      <div>
        <h1>ui-kit</h1>
      </div>
      <div className="animals">
        <select onChange={this.props.onChange}>
          <option value="">--Please choose an option--</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="hamster">Hamster</option>
          <option value="parrot">Parrot</option>
          <option value="spider">Spider</option>
          <option value="goldfish">Goldfish</option>
        </select>
      </div>
    </header>);
  }
}

class SideBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<nav>
      <ul>
        <li><a title="Example App" onClick={() => this.props.onClick("http://localhost:3001")}>Example App</a></li>
      </ul>
    </nav>);
  }
}

class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const attributes = {
      src: this.props.source,
      scrolling: "no"
    };
    console.log("payload is:" + this.props.payload);
    return (<main>
      <CandyIframe attributes={attributes} payload={this.props.payload}></CandyIframe>
    </main>);
  }
}

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<footer></footer>);
  }
}

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      source: "https://map.baidu.com/",
      payload: ""
    };
  }

  render() {
    return (<div className="layout">
      <Header onChange={(event) => this.onChange(event)}></Header>
      <SideBar onClick={(source) => this.handleClick(source)}></SideBar>
      <Content source={this.state.source} payload={this.state.payload}></Content>
    </div>);
  }

  handleClick(source) {
    this.setState({ source: source });
  }

  onChange(event) {
    console.log("change to:" + event.target.value);
    this.setState({ payload: event.target.value });
  }
}

export { Header, SideBar, Content };

export default Layout;
