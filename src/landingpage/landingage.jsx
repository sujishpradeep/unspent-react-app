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
                onClick={() => {
                  window.location = "/login";
                }}
                color="yellow"
                basic
                inverted
              >
                <b className=""> Login</b>
              </Button>
              <div className="pl5 inline"></div>

              <Button
                color="yellow"
                onClick={() => {
                  window.location = "/signup";
                }}
              >
                <div className="primary">Sign up</div>
              </Button>
            </div>
          </div>
          <div className="main-body">
            <Grid divided="vertically" stackable>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <div className="banner-text">
                    <div className="banner-header">
                      Unspent helps you to trim down your expense clutters and
                      move those to things that you really love to do
                    </div>

                    <br></br>
                    <div className="banner-sub-header">
                      Unspent's features helps you to manage your extra expenses
                      smartly, so that you can utilize it wisely based on your
                      prefered choices
                    </div>
                    {/* <p>
                     
                    </p> */}
                    <br></br>
                    <div style={{ textAlign: "center" }}>
                      <Button
                        color="yellow"
                        size="huge"
                        onClick={() => {
                          window.location = "/signup";
                        }}
                      >
                        <div className="primary">Sign up and explore!</div>
                      </Button>
                    </div>
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
