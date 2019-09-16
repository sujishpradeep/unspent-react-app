import PropTypes from "prop-types";
import React, { Component } from "react";

import "../landingpage.css";
import { Link } from "react-router-dom";
import { Grid, Divider, Input, Button } from "semantic-ui-react";
import { Image } from "semantic-ui-react";
import banner from "../banner.png";
import SignUp from "../login/signup";

class LandingPage extends Component {
  state = {};

  render() {
    return (
      <div>
        <div className="main-first">
          <div id="main-navbar">
            <div id="main-nav-trailo">
              <Link to="/">
                <div className="main-big-font inline">#Unspent</div>
              </Link>
            </div>

            <div className="main-buttons">
              <Button
                inverted
                onClick={() => {
                  window.location = "/login";
                }}
              >
                Login
              </Button>
              <div className="pl5 inline"></div>

              <Button
                positive
                onClick={() => {
                  window.location = "/signup";
                }}
              >
                Sign up
              </Button>
            </div>
          </div>
          <div className="main-body">
            <Grid divided="vertically" stackable>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <div className="banner-text">
                    <h1>
                      Unspent lets you track the expenses which you chose not to
                      make in a rewarding way
                    </h1>
                    <br></br>
                    <p>
                      Unspent's features helps you to manage your extra expenses
                      smartly, so that you can utilize it wisely based on your
                      prefered choices
                    </p>
                    <br></br>
                    <Button
                      color="green"
                      size="huge"
                      onClick={() => {
                        window.location = "/signup";
                      }}
                    >
                      Sign up and explore!
                    </Button>
                  </div>
                </Grid.Column>

                <Grid.Column>
                  <div className="banner-image">
                    <Image src={banner} size="huge" />
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
