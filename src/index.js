import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "core-js/stable";
import "regenerator-runtime/runtime";
import "./index.scss";

const Index = () => (
  <div>
    <App />
  </div>
);

ReactDOM.render(<Index />, document.getElementById("index"));
