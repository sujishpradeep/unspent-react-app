import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import "font-awesome/css/font-awesome.css";
// import "semantic-ui-css/semantic.min.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-less/semantic.less";

document.addEventListener("DOMContentLoaded", function(event) {
  ReactDOM.render(<App />, document.getElementById("root"));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
