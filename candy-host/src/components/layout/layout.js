import React from "react";
import "./layout.less";
import { CandyIframe } from "candy-base/src";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<header>
      <div>
        <h1>candy-host</h1>
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
        <li><a title="candy-app" onClick={() => this.props.onClick("http://localhost:3100")}>candy-app</a></li>
      </ul>
    </nav>);
  }
}

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      receivePayload: ""
    };
  }

  onMessage(event) {
    if (event.origin !== "http://localhost:3100") {
      console.warn("warning: message is rejected");
      return;
    }
    this.setState({ receivePayload: event.data });
  }

  render() {
    const attributes = {
      src: this.props.source,
      scrolling: "no"
    };
    const req = {
      payload: this.props.postPayload,
      originTarget: "http://localhost:3100"
    };
    return (<main>
      <h3>candy-host >> Message received from cand-app: {this.state.receivePayload}</h3>
      <CandyIframe attributes={attributes} request={req} onMessage={(event) => this.onMessage(event)}/>
    </main>);
  }
}

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<footer/>);
  }
}

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      source: "http://localhost:3100",
      postPayload: ""
    };
  }

  render() {
    return (<div className="layout">
      <Header onChange={(event) => this.onChange(event)}/>
      <SideBar onClick={(source) => this.handleClick(source)}/>
      <Content source={this.state.source} postPayload={this.state.postPayload}/>
    </div>);
  }

  handleClick(source) {
    this.setState({ source: source });
  }

  onChange(event) {
    console.log("change to:" + event.target.value);
    this.setState({ postPayload: event.target.value });
  }
}

export { Header, SideBar, Content };

export default Layout;
