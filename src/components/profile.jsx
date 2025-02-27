import React, { Component } from "react";
import {
  Button,
  Modal,
  Label,
  Divider,
  Segment,
  Grid
} from "semantic-ui-react";
import authservice from "../services/authservice";
import { refreshAccount } from "../services/accountService";

class Profile extends Component {
  state = {};

  closeModal = () => {
    this.setState({ showModal: false });
  };

  componentDidMount() {
    const activeItem = "Rewards Earned";
    const token = authservice.getCurrentUser();
    const id = token && token.accountid;
    const email = token && token.email;
    this.setState({ activeItem, id, email });
  }
  logOut = () => {
    authservice.logout();
    window.location = "/";
  };

  handleRefresh = async () => {
    await refreshAccount(this.state.id);

    window.location = "/";
  };

  render() {
    const { showModal } = this.state;

    return (
      <React.Fragment>
        <div style={{ paddingTop: "5%", textAlign: "center" }}>
          <Divider hidden></Divider>
          <Divider hidden></Divider>

          <Grid centered>
            <Segment raised secondary>
              <div
                className="satisfy-font"
                style={{ fontSize: "40px", color: "#00817b" }}
              >
                #Unspent
              </div>
            </Segment>
          </Grid>

          <Divider hidden></Divider>
          <Divider hidden></Divider>
          <Divider hidden></Divider>

          <Grid centered>
            <Segment secondary>
              <div
                style={{
                  color: "#424242",
                  fontSize: "18px",
                  padding: "2px 0 0 0px",
                  fontWeight: "bold"
                }}
              >
                Login Account
              </div>
              <div style={{ color: "#2D2d2d" }}>{this.state.email}</div>
            </Segment>
          </Grid>

          <br></br>
          <div style={{ paddingTop: "5%", textAlign: "center" }}>
            <Segment raised secondary>
              <Grid columns={2} divided>
                <Grid.Column>
                  <Modal
                    trigger={
                      <div
                        onClick={() => {
                          this.setState({ showModal: true });
                        }}
                      >
                        <Button
                          color="blue"
                          circular
                          icon="refresh"
                          size="small"
                        ></Button>
                        <div style={{ paddingTop: "5px" }} className="pointer">
                          <Label color="blue"> Account Refresh</Label>
                        </div>
                      </div>
                    }
                    size="mini"
                    closeIcon
                    open={showModal}
                    onClose={() => {
                      this.setState({ showModal: false });
                    }}
                  >
                    <Modal.Header>Refresh My Account</Modal.Header>
                    <Modal.Content>
                      <h5>
                        Refreshing your account allows you to remove all
                        activities from your account and start afresh.
                      </h5>
                      <h5>Click "Confirm" to Refresh Your Account</h5>
                      <Modal.Actions>
                        <Button
                          color="red"
                          icon="close"
                          labelPosition="right"
                          content="Cancel"
                          onClick={() => {
                            this.setState({ showModal: false });
                          }}
                        />
                        <Button
                          color="blue"
                          icon="refresh"
                          labelPosition="right"
                          content="Confirm "
                          onClick={event => {
                            this.handleRefresh();
                          }}
                        />
                      </Modal.Actions>
                    </Modal.Content>
                  </Modal>
                </Grid.Column>
                <Grid.Column>
                  <Button
                    color="orange"
                    circular
                    icon="power off"
                    size="small"
                    onClick={this.logOut}
                  ></Button>
                  <div
                    style={{ paddingTop: "5px" }}
                    className="pointer"
                    onClick={this.logOut}
                  >
                    <Label color="orange">Sign out </Label>
                  </div>
                </Grid.Column>
              </Grid>
            </Segment>
          </div>
          <Divider hidden></Divider>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
