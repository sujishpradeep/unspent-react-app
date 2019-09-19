import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import auth from "./services/authservice";

import NavBar from "./components/navbar";
import Login from "./login/login";

import LandingPage from "./landingpage/landingage";
import SignUp from "./login/signup";
import { getAccount } from "./services/accountService";

class App extends Component {
  state = { token: {}, rewards: [], redeems: [] };

  async componentDidMount() {
    const token = auth.getCurrentUser();
    if (token && token.accountid) {
      const { data } = await getAccount(token.accountid);

      const { rewards, redeems } = data;
      this.setState({ rewards, redeems });
    }
    this.setState({ token });
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  render() {
    const { token, rewards, redeems } = this.state;
    return (
      <Router>
        <Switch>
          {!token && <Route path="/login" component={Login} />}
          {!token && <Route path="/signup" component={SignUp} />}
          {!token && <Route path="/" component={LandingPage} />}
          <NavBar
            fullname={token && token.fullname}
            accountid={token && token.accountid}
            rewards={rewards}
            redeems={redeems}
          ></NavBar>
        </Switch>
      </Router>
    );
  }
}

export default App;
