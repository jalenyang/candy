import React from "react";

class SSE extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: "", sse: new EventSource("http://localhost:3500/sse")
    };
  }

  onStart() {
    const { sse } = this.state;
    console.log("starting sse....");
    sse.onmessage = (e) => {
      this.setState({
        currentDate: e.data
      });
    };
    sse.onopen = () => {
      console.log("The connection has been established.");
    };
    sse.onerror = (e) => {
      console.log(e);
    };
  }

  onStop() {
    const { sse } = this.state;
    sse.close();
  }

  render() {
    return (<>
      <button onClick={() => this.onStart()}>start SSE</button>
      <button onClick={() => this.onStop()} style={{ marginLeft: 10 + "px" }}>stop SSE</button>
      <p>{this.state.currentDate}</p>
    </>);
  }
}

export { SSE };
