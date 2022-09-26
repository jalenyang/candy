import React from "react";
import { CandyDispatcher } from "candy-base/src";
import { CandyTabPane, CandyTabs } from "candy-base/src/component/tabs/CandyTabs";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postPayload: "", receivePayload: "", users: ""
    };
  }

  sendMessageToHost(message) {
    console.log("change message to:" + message);
    this.setState({ postPayload: message });
  }

  onMessage(event) {
    if (event.origin !== "http://localhost:3000") {
      console.warn("warning: message is rejected");
      return;
    }
    console.log("candy-app>>Message received from host:" + event.origin + " data:" + event.data);
    this.setState({ receivePayload: event.data });
  }

  async getUsers() {
    const headers = new Headers();
    headers.append("content-type", "application/json");
    const options = {
      method: "GET", headers: headers, mode: "cors", cache: "default"
    };
    const response = await fetch("http://localhost:3500/users", options);
    if (!response.ok) {
      console.error("Api error");
    }
    const jsonVal = await response.text();
    this.setState({
      users: jsonVal
    });
  }

  render() {
    const req = {
      payload: this.state.postPayload, originTarget: "http://localhost:3000", source: window.parent
    };
    const { users, receivePayload } = this.state;
    return (<div className="main">
      <CandyTabs activeKey="0">
        <CandyTabPane name="Message" key="0">
          <h3>Received message from candy-host: {receivePayload}</h3>
          <div>
            <span>send hello message to host </span>
            <button onClick={() => this.sendMessageToHost("Hello candy-host:" + crypto.randomUUID())}>Send</button>
          </div>
        </CandyTabPane>
        <CandyTabPane name="API" key="1">
          <button onClick={() => this.getUsers()}>Get users</button>
          <p>{users}</p>
        </CandyTabPane>
      </CandyTabs>
      <CandyDispatcher request={req} onMessage={(event) => this.onMessage(event)}/>
    </div>);
  }

}
