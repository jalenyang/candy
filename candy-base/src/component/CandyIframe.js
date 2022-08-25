import React from "react";
import Message, { listenToMessage, sendMessage, stopListenToMessage } from "./message.js";

export default class CandyIframe extends React.Component {
  constructor(probs) {
    super(probs);
    this._iframe = null;
  }

  componentDidMount() {
    listenToMessage(this.receiveMessage);
  }

  componentWillUnmount() {
    stopListenToMessage(this.receiveMessage);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.payload !== this.props.payload) {
      const msg = new Message(this.props.payload, "http://localhost:3001");
      sendMessage(this._iframe.contentWindow, msg);
    }
  }

  receiveMessage(event) {
    console.log("message received:" + event.origin);
  }

  render() {
    let props = Object.assign({}, CandyIframe.initialProbs, this.props.attributes);
    return (<iframe ref={(ele) => {
      this._iframe = ele;
    }} {...props}/>);
  }
}

CandyIframe.initialProbs = {
  width: "100%", height: "100%"
};
