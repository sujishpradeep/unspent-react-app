import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch
  // Redirect
} from "react-router-dom";
import "./App.css";
import auth from "./services/authservice";

import NavBar from "./components/navbar";
import Login from "./login/login";

import LandingPage from "./landingpage/landingage";
import SignUp from "./login/signup";

class App extends Component {
  state = { token: {} };

  componentDidMount() {
    const token = auth.getCurrentUser();
    this.setState({ token });
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  render() {
    const { token } = this.state;
    return (
      <Router>
        <Switch>
          {!token && <Route path="/login" component={Login} />}
          {!token && <Route path="/signup" component={SignUp} />}
          {!token && <Route path="/" component={LandingPage} />}
          <NavBar fullname={token && token.fullname}></NavBar>
        </Switch>
      </Router>
    );
  }
}

export default App;
