import React from "react";
import "./instant.less";

class Instant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sendMsg: "", receiveMsg: ""
    };
  }

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    const { socket } = this.state;
    socket.close();
    console.log("closed...");
  }

  init() {
    const socket = new WebSocket("ws://localhost:3501");
    socket.onopen = (e) => {
      socket.send("connected");
    };
    socket.onmessage = (e) => {
      this.setState({
        receiveMsg: e.data,
      });
    };
    this.setState({
      socket: socket
    });
  }

  onMsgChange(event) {
    this.setState({ sendMsg: event.target.value });
  }

  onSend() {
    this.state.socket.send(this.state.sendMsg);
  }

  render() {
    const { receiveMsg } = this.state;

    return (<div className="instant">
      <div className="sendMsg">
        <textarea className="box" placeholder="type message..." value={this.state.sendMsg}
                  onChange={(event) => this.onMsgChange(event)}></textarea>
        <button onClick={() => this.onSend()}>send</button>
      </div>
      <p className="receiveMsg">server response: {receiveMsg}</p>
    </div>);
  }
}

export { Instant };
