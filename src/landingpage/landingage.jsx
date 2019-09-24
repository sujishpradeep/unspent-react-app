import PropTypes from "prop-types";
import React, { Component } from "react";

import "../landingpage.css";
import { Link } from "react-router-dom";
import {
  Grid,
  Divider,
  Input,
  Button,
  Icon,
  Header,
  Comment,
  Confirm,
  Segment
} from "semantic-ui-react";
import { Image } from "semantic-ui-react";
import banner from "../banner-5.png";
import imagebox from "../box.svg";
import imageshopping from "../shopping.svg";
import imageunspent from "../movie.svg";
import matt from "../matt.jpg";
import stevie from "../stevie.jpg";
import elliot from "../elliot.jpg";

class LandingPage extends Component {
  state = {};

  render() {
    return (
      <div className="lp-body">
        <div className="main-first">
          <div id="main-navbar">
            <div id="main-nav-trailo">
              <Link to="/">
                <div className="main-big-font inline">#Unspent</div>
              </Link>
            </div>

            <div className="main-buttons">
              <Link
                onClick={() => {
                  window.location = "/login";
                }}
                className=" login-button"
              >
                <b className="white"> Login</b>
              </Link>
              <div className="pl5 inline"></div>

              <Button
                color="white"
                onClick={() => {
                  window.location = "/signup";
                }}
              >
                <div className="primary">Sign up</div>
              </Button>
            </div>
          </div>

          <div className="main-body">
            <Grid columns={2} stackable>
              <Grid.Row>
                <Grid.Column>
                  <div className="banner-text ">
                    <div className="banner-header white">
                      UNSPEND SMART,
                      <div className="banner-header-2 white">SPEND WISE</div>
                    </div>

                    <div className="banner-sub-header white">
                      Unspent helps you to move your spendings onto things that
                      truly matter to you, in a simple and rewarding way.
                    </div>

                    <br></br>
                    <div style={{ textAlign: "", paddingBottom: "25px" }}>
                      <Button
                        color="purple"
                        size="huge"
                        onClick={() => {
                          window.location = "/signup";
                        }}
                      >
                        <div
                          className="white"
                          style={{ letterSpacing: "0.5px" }}
                        >
                          Sign up - It's free!
                        </div>
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
        <div className="steps-intro">
          <div className="main-font">
            See How You can Use
            <div className="block satisfy">{`   #Unspent`} </div>
          </div>
        </div>
        <Divider hidden></Divider>
        <div className="steps-main">
          <Grid columns={2} stackable>
            <Grid.Column verticalAlign="middle">
              <div className="steps-text steps-pl ">
                <div className="steps-header">
                  Define your Redeem Boxes <Icon name="box"></Icon>
                </div>
                <div className="steps-para">
                  Enter the items on which you desire to spend your money on, in
                  the Redeem Boxes in your Unspent App.
                </div>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className="banner-image">
                <Image src={imagebox} size="huge" />
              </div>
            </Grid.Column>
          </Grid>
        </div>
        <div className="steps-main">
          <Grid columns={2} stackable reversed="mobile">
            <Grid.Column>
              <div className="banner-image">
                <Image src={imageunspent} size="huge" />
              </div>
            </Grid.Column>
            <Grid.Column verticalAlign="middle">
              <div className="steps-text steps-pr">
                <div className="steps-header">
                  Unspend and Earn Rewards <Icon name="tags"></Icon>
                </div>
                <div className="steps-para">
                  Anytime you decide to spend lesser on other "not-so-necessary"
                  items, add the Unspent money as Rewards in your Unspent App.
                </div>
              </div>
            </Grid.Column>
          </Grid>
        </div>

        <div className="steps-main">
          <Grid columns={2} stackable>
            <Grid.Column verticalAlign="middle">
              <div className="steps-text steps-pl">
                <div className="steps-header">
                  Redeem your Rewards <Icon name="check square"></Icon>
                </div>
                <div className="steps-para">
                  Use the money you have Unspent, on the items you had entered
                  in your Redeem Boxes and mark the Rewards as Redeemed in your
                  Unspent App!
                </div>
              </div>
            </Grid.Column>
            <Grid.Column>
              <div className="banner-image">
                <Image src={imageshopping} size="huge" />
              </div>
            </Grid.Column>
          </Grid>

          <div className="info-comments">
            <Divider hidden></Divider>
            <Grid centered>
              <Segment compact raised>
                <div
                  className="satisfy-font"
                  style={{
                    fontSize: "35px",
                    paddingBottom: "10px",
                    textAlign: "center",
                    color: "rgba(0, 0, 0, 0.87)"
                    // color: "#ff4081"
                  }}
                >
                  #Happy Spendings with #Unspent..! <br></br>
                  {/* <div className="inline" style={{ fontFamily: "Open Sans" }}>
                stories!
              </div> */}
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    textAlign: "center",
                    color: "rgba(0, 0, 0, 0.87)",
                    fontWeight: "bold"
                  }}
                >
                  Meet Matt, Stevie and Eliott
                </div>
              </Segment>
            </Grid>
            <Divider hidden></Divider>
            <Divider hidden></Divider>

            <Grid columns={3} stackable>
              <Grid.Column>
                <Segment raised>
                  <Comment.Group size="huge">
                    <Comment>
                      <Comment.Avatar src={matt} />
                      <Comment.Content>
                        <Comment.Author>Matt </Comment.Author>
                        <Comment.Text>
                          {`
                          Matt skipped his Wednesday Evening Pizza parties for a
                          month and went on an exciting road trip using his
                          Unspent Money! `}
                          <Icon name="motorcycle" color="grey"></Icon>
                        </Comment.Text>
                      </Comment.Content>
                    </Comment>
                  </Comment.Group>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment raised>
                  <Comment.Group size="huge">
                    <Comment>
                      <Comment.Avatar src={stevie} size="massive" />
                      <Comment.Content>
                        <Comment.Author>Stevie </Comment.Author>
                        <Comment.Text>
                          {`
                          Stevie chose not to order a new pair of shoes this
                          Christmas. Instead, she gifts her best friend a
                          cute 'n lovely leather wallet `}
                          <Icon name="heart" color="red"></Icon>
                        </Comment.Text>
                      </Comment.Content>
                    </Comment>
                  </Comment.Group>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment raised>
                  <Comment.Group size="huge">
                    <Comment>
                      <Comment.Avatar src={elliot} />
                      <Comment.Content>
                        <Comment.Author>Elliot </Comment.Author>
                        <Comment.Text>
                          {` 
                          Elliot thinks he is overspending on his
                          home furnishings. He opts to wait for the best deals and invest the unspent money in his retirement
                          account! `}
                          <Icon name="chart line" color="brown"></Icon>
                        </Comment.Text>
                      </Comment.Content>
                    </Comment>
                  </Comment.Group>
                </Segment>
              </Grid.Column>
            </Grid>
          </div>

          <div className="steps-footer">
            <div
              className="steps-tiny"
              style={{ fontSize: "18px", color: "red", padding: "5px" }}
            >
              Join the Smart and Happy Spenders!
            </div>
            <div className="steps-footer-header">
              Start using <div className="satisfy inline"> #Unspent </div> today
            </div>
            <div className="steps-footer-para">
              Sign up and try out a simple and rewarding way to develop good
              spending habits.
            </div>
            <Button
              positive
              size="huge"
              onClick={() => {
                window.location = "/signup";
              }}
            >
              Get Started - It's free !
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
