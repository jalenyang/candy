import React from "react";
import "./CandyTabs.less";

function CandyTabPane({ children }) {
  return (<div>
    {children}
  </div>);
}

class CandyTabs extends React.Component {

  constructor(props) {
    super(props);
    const { children, activeKey } = props;
    this.state = {
      tabPane: children.length > activeKey ? children[activeKey] : React.createElement("div", null, null),
      activeKey: activeKey
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== this.props) {
      this.setState({
        tabPane: this.props.children[prevState.activeKey]
      });
    }
  }

  onClick(idx) {
    this.setState({
      tabPane: this.props.children[idx], activeKey: idx
    });
  }

  render() {
    const labels = this.props.children.map((tab, idx) => {
      if (idx == this.state.activeKey) {
        return (<li key={idx}>
          <a className="active" onClick={() => this.onClick(idx)}>{tab.props.name}</a>
        </li>);
      }
      return (<li key={idx}>
        <a onClick={() => this.onClick(idx)}>{tab.props.name}</a>
      </li>);
    });
    return (<div className="tabs">
      <ol>
        {labels}
      </ol>
      {this.state.tabPane}
    </div>);
  }
}

export { CandyTabs, CandyTabPane };
