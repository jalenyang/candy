import React from "react";
import { CandyDispatcher } from "./CandyDispatcher.js";

export class CandyIframe extends React.Component {
  constructor(probs) {
    super(probs);
    this._iframe = React.createRef();
  }


  render() {
    let props = Object.assign({}, CandyIframe.initialProbs, this.props.attributes);
    const req = { ...this.props.request, ...{ source: this._iframe.current?.contentWindow } };
    return (
      <iframe ref={this._iframe} {...props}>
        <CandyDispatcher request={req} onMessage={(event) => this.props.onMessage(event)}/>
      </iframe>);
  }
}

CandyIframe.initialProbs = {
  width: "100%", height: "100%"
};
