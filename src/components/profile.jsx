import React, { Component } from "react";
import {
  Form,
  Input,
  Button,
  Menu,
  Label,
  Container,
  Icon,
  Divider,
  Segment,
  Header,
  Grid
} from "semantic-ui-react";
import HeaderSubHeader from "semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader";
import authservice from "../services/authservice";
var cc = require("currency-codes/data");

var _ = require("lodash");

class Profile extends Component {
  state = {};

  componentDidMount() {
    const activeItem = "Rewards Earned";
    this.setState({ activeItem });
  }
  logOut = () => {
    console.log("logout");
    authservice.logout();
    window.location = "/";
  };

  render() {
    const { rewards, redeems } = this.props;
    console.log(cc);

    const options = cc.map(c => {
      const container = {};

      container["key"] = c.code;
      container["value"] = c.code;
      container["text"] = `${c.code} - ${c.currency}`;

      return container;
    });
    console.log("options", options);

    return (
      <React.Fragment>
        <div style={{ paddingTop: "20%", textAlign: "center" }}>
          <Grid centered>
            <Segment compact basic>
              <Header> Login Account </Header>
              <Label color="grey" size="huge">
                sujishp164@gmail.com
              </Label>
            </Segment>
          </Grid>

          <div style={{ paddingTop: "10%", textAlign: "center" }}>
            <Divider></Divider>
            <Grid columns={2} divided>
              <Grid.Column>
                <Button
                  color="teal"
                  circular
                  icon="refresh"
                  size="small"
                ></Button>
                <div style={{ paddingTop: "5px" }} className="pointer">
                  <Label color="teal"> Account Refresh</Label>
                </div>
              </Grid.Column>
              <Grid.Column>
                <Button
                  color="orange"
                  circular
                  icon="power off"
                  size="small"
                  onClick={this.logOut}
                ></Button>
                <div style={{ paddingTop: "5px" }} className="pointer">
                  <Label color="orange">Sign out </Label>
                </div>
              </Grid.Column>
            </Grid>
          </div>
          <Divider></Divider>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
