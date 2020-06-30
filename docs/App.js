import React, { Component } from "react";

const debug =
  process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();

class App extends Component {
  render() {
    return (
<div>Start from here</div>
      
    );
  }
}

export default App;
