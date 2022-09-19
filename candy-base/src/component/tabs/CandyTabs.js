import React from "react";
import "./CandyTabs.less";

class CandyTabPane extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (<li>
      {this.props.children}
    </li>);
  }

}

class CandyTabs extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const labels = this.props.children.map((ctab, idx) => {
      return (<li><button className="btn" key={idx}>{ctab.props.name}</button></li>);
    });
    return (<div className="tabs">
      <ol>
        {labels}
      </ol>
      {this.props.children}
    </div>);
  }
}

export { CandyTabs, CandyTabPane };
