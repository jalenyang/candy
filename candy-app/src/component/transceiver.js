import React from "react";
import { listenToMessage, Message, sendMessage } from "candy-base/src";

export default class Transceiver extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      payload: ""
    };
    this.handleReceiveMessage = this.handleReceiveMessage.bind(this);
  }

  componentDidMount() {
    listenToMessage(this.handleReceiveMessage);
  }

  handleReceiveMessage(event) {
    if (event.origin !== "http://localhost:3000") {
      console.log("warning: message is rejected");
      return;
    }
    this.setState({ payload: event.data });
  }

  sendMessageToHost() {
    const msg = new Message("Hello from candy app", "http://localhost:3000");
    sendMessage(window.parent, msg);
  }

  render() {
    return (<div>
      <h1>Received message from host: {this.state.payload}</h1>
      <div>
        <span>send hello message to host </span>
        <button onClick={this.sendMessageToHost}>Send</button>
      </div>
    </div>);
  }

}
