import React, { Component } from "react";
import { signUp } from "../services/authservice";

import {
  Form,
  Button,
  Label,
  Segment,
  Divider,
  Message
} from "semantic-ui-react";
import { GoogleLogin } from "react-google-login";
import { Link } from "react-router-dom";
var _ = require("lodash");
const Joi = require("joi");

class SignUp extends Component {
  state = {
    user: { email: "", password: "", fullname: "" },
    errors: {},
    redirectUser: false
  };

  responseGoogle = response => {
    console.log(response);
    localStorage.setItem("type", "google");
    localStorage.setItem("token", JSON.stringify(response.tokenObj.id_token));
    this.setState({ redirectUser: true });
    window.location = "/rewards";
  };

  handleSubmit = async () => {
    const { error } = this.validateUser();

    const errors = {};

    if (error) {
      for (let item of error.details) errors[item.path[0]] = item.message;
    }

    this.setState({ errors: errors });
    if (error) {
      console.log("error", error);
      return;
    }

    console.log("NOT ERROR");

    try {
      const { user } = this.state;
      user.loginmethod = "email";
      console.log("user", user);
      await signUp(user);
      window.location = `/rewards`;
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  handleChange = (event, { name, value }) => {
    if (this.state.user.hasOwnProperty(name)) {
      let { user } = this.state;
      user[name] = value;
      // delete errors[name];

      //   const { error } = this.validateProperty(name, value);

      //   if (error) {
      //     for (let item of error.details) errors[item.path[0]] = item.message;
      //   }
      this.setState({ user });
    }
  };

  schema = Joi.object().keys({
    email: Joi.string()
      .email()
      .required()
      .error(err => {
        return {
          message: "Invalid email"
        };
      }),
    password: Joi.string()
      .min(6)
      .required()
      .error(errors => {
        errors.forEach(err => {
          switch (err.type) {
            case "any.empty":
              err.message = "Password can't be blank";
              break;
            case "string.min":
              err.message = `Password is too short (Minimum is ${err.context.limit} characters)`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),

    fullname: Joi.string()
      .required()
      .error(() => {
        return {
          message: `Name can't be blank`
        };
      }),
    loginmethod: Joi.string().optional()
  });

  //   validateProperty = (name, value) => {
  //     const obj = { [name]: value };
  //     const schema = { [name]: this.schema[name] };
  //     return Joi.validate(obj, schema);
  //   };

  validateUser = () => {
    const { user } = this.state;

    const options = { abortEarly: false };
    return Joi.validate(user, this.schema, options);
  };

  render() {
    const { errors } = this.state;
    console.log("errors", errors);

    return (
      <div className="new-container">
        <div className="login-form align-center">
          <Link to="/">
            <h1 className="logo-font block mb10">#Unspent</h1>
          </Link>

          <Segment padded>
            <GoogleLogin
              clientId="815040356813-cu6jblg136af2tfbju6amps6eip5g1gh.apps.googleusercontent.com"
              buttonText="Login"
              render={renderProps => (
                <button
                  class="loginBtn loginBtn--google"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Sign up with Google
                </button>
              )}
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={"single_host_origin"}
            />

            <Divider horizontal>or</Divider>
            <Segment min>
              <form className="login" onSubmit={this.handleSubmit}>
                <h4>Sign Up With Email</h4>
                {!_.isEmpty(errors) && (
                  <Message
                    color="red"
                    header="Error"
                    list={Object.values(errors)}
                  />
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
                  <Form.Field>
                    <Form.Input
                      placeholder="First And Last Name"
                      name="fullname"
                      onChange={this.handleChange}
                    />
                  </Form.Field>

                  <Button
                    type="submit"
                    color="violet"
                    onClick={event => {
                      this.handleSubmit();
                    }}
                  >
                    Sign up
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

export default SignUp;
