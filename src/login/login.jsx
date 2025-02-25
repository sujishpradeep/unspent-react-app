import React, { Component } from "react";

import { Form, Button, Segment, Divider, Message } from "semantic-ui-react";
import GoogleLogin from "react-google-login";
import { login, logingoogle } from "../services/authservice";
import { Link } from "react-router-dom";
var _ = require("lodash");

class Login extends Component {
  state = {
    user: { email: "", password: "" },
    errors: {},
    redirectUser: false
  };

  responseGoogle = async response => {
    const token = JSON.stringify(response.tokenObj.id_token);
    localStorage.setItem("gtoken", token);
    this.setState({ redirectUser: true });

    try {
      const user = {};
      user.email = response.profileObj.email;
      user.password = token;
      user.loginmethod = "gmail";
      user.fullname = response.profileObj.name;
      await logingoogle(user);
      window.location = "/rewards";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  handleSubmit = async () => {
    try {
      await login(this.state.user);
      window.location = "/rewards";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email =
          "We couldn’t find an account matching the email and password you entered. Please check your email and password and try again.";
        this.setState({ errors });
      }
    }
  };

  handleChange = (event, { name, value }) => {
    if (this.state.user.hasOwnProperty(name)) {
      let { user } = this.state;
      user[name] = value;

      this.setState({ user });
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="new-container">
        <div className="login-form align-center">
          <Link to="/">
            <h1 className="logo-font block mb10">#Unspent</h1>
          </Link>

          <Segment padded>
            <GoogleLogin
              clientId="815040356813-cu6jblg136af2tfbju6amps6eip5g1gh.apps.googleusercontent.com"
              render={renderProps => (
                <button
                  class="loginBtn loginBtn--google"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Sign in with Google
                </button>
              )}
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={"single_host_origin"}
            />

            <Divider horizontal>or</Divider>
            <Segment min>
              <form className="login" onSubmit={this.handleSubmit}>
                <h4>Sign in With Email</h4>
                {!_.isEmpty(errors) && (
                  <Message color="red" className="tal">
                    {errors.email}
                  </Message>
                )}
                <Form>
                  <Form.Field>
                    <Form.Input
                      placeholder="Email"
                      name="email"
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Form.Input
                      placeholder="Password"
                      type="password"
                      name="password"
                      onChange={this.handleChange}
                    />
                  </Form.Field>

                  <Button
                    type="submit"
                    color="purple"
                    onClick={event => {
                      this.handleSubmit();
                    }}
                  >
                    Sign in
                  </Button>
                </Form>
              </form>
            </Segment>
          </Segment>
        </div>
      </div>
    );
  }
}

export default Login;
