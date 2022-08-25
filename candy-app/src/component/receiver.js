import React from "react";
import { receiveMessage } from "ui-core/src";

export default class Receiver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payload: ""
    };
    this.handleReceiveMessage = this.handleReceiveMessage.bind(this);
  }

  componentDidMount() {
    receiveMessage(this.handleReceiveMessage);
  }

  handleReceiveMessage(event) {
    if (event.origin !== "http://localhost:3000") {
      console.log("warning: message is rejected");
      return;
    }
    this.setState({ payload: event.data });
  }

  render() {
    return (<h1>Received message: {this.state.payload}</h1>);
  }

}
