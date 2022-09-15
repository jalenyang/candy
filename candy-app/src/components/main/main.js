import React from "react";
import { CandyDispatcher } from "candy-base/src";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postPayload: "",
      receivePayload: ""
    };
  }

  sendMessageToHost(message) {
    this.setState({ postPayload: message });
  }

  onMessage(event) {
    if (event.origin !== "http://localhost:3000") {
      console.log("warning: message is rejected");
      return;
    }
    console.log("candy-app>>Message received from host:" + event.origin + " data:" + event.data);
    this.setState({ receivePayload: event.data });
  }

  render() {
    const req = {
      payload: this.state.postPayload,
      originTarget: "http://localhost:3000",
      source: window.parent
    };
    const msgId = crypto.randomUUID();
    return (<div>
      <h3>Received message from candy-host: {this.state.receivePayload}</h3>
      <div>
        <span>send hello message to host </span>
        <button onClick={() => this.sendMessageToHost("Hello candy-host:" + msgId)}>Send</button>
      </div>
      <CandyDispatcher request={req} onMessage={(event) => this.onMessage(event)}/>
    </div>);
  }

}
