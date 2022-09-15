import React from "react";

class Request {
  source;
  payload;
  originTarget;

  constructor(source, payload, originTarget) {
    this.source = source;
    this.payload = payload;
    this.originTarget = originTarget;
  }
}

class CandyDispatcher extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.listenToMessage();
  }

  componentWillUnmount() {
    this.stopListenToMessage();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.request?.payload !== this.props.request?.payload) {
      this.sendMessage(this.props.request);
    }
  }

  listenToMessage() {
    window.addEventListener("message", (event) => {
      this.props.onMessage(event);
    }, false);
  }

  stopListenToMessage() {
    window.removeEventListener("message", this.listenToMessage, false);
  }

  // send message to the parent
  sendMessage() {
    const { source, payload, originTarget } = this.props.request;
    if (source) {
      console.log("sending message to:" + originTarget + " data:" + payload);
      source.postMessage(payload, originTarget);
    }
  }

  render() {
    return (<></>);
  }
}

export { Request, CandyDispatcher };

