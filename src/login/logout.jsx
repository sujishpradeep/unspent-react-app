import React, { Component } from "react";
import auth from "../services/authservice";

class Logout extends Component {
  state = {};
  componentDidMount() {
    auth.logout();
    window.location = "/";
  }
  render() {
    return <div />;
  }
}

export default Logout;
