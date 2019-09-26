import React, { Component } from "react";
import { Grid, Menu, Segment } from "semantic-ui-react";
import ActivityCard from "./activitycard";
import authservice from "../services/authservice";
import { getAccount } from "../services/accountService";

var _ = require("lodash");

class Activities extends Component {
  state = {
    activeItem: "Rewards Earned",
    rewards: [],
    redeems: [],
    isLoading: true
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  async componentDidMount() {
    const token = authservice.getCurrentUser();
    if (token && token.accountid) {
      const { data } = await getAccount(token.accountid);
      const { rewards, redeems } = data;
      const activeItem = "Rewards Earned";
      this.setState({ activeItem, rewards, redeems, isLoading: false });
    }
  }

  sort = (array, property) => {
    return _.groupBy(array, property);
  };
  render() {
    const { rewards, redeems, isLoading } = this.state;

    if (isLoading) return <div style={{ height: "100%", width: "100%" }}></div>;

    const sortedRewards = this.sort(rewards, "category");
    const sortedRedeems = this.sort(redeems, "box");

    const { activeItem } = this.state;

    return (
      <React.Fragment>
        <Segment raised>
          <Menu secondary color="black">
            <Menu.Item
              name="Rewards Earned"
              active={activeItem === "Rewards Earned"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="Rewards Redeemed"
              active={activeItem === "Rewards Redeemed"}
              onClick={this.handleItemClick}
            />
          </Menu>

          {activeItem === "Rewards Earned" && (
            <div>
              <Grid columns={2} centered>
                {Object.keys(sortedRewards).map(k => (
                  <Grid.Column key={k}>
                    <ActivityCard
                      activities={sortedRewards[k]}
                      type={k}
                    ></ActivityCard>
                  </Grid.Column>
                ))}
              </Grid>
              {_.isEmpty(sortedRewards) && (
                <div>
                  <br></br>
                  <Segment>
                    <div> You are yet to earn your first Rewards! </div>
                  </Segment>
                </div>
              )}
            </div>
          )}
          {activeItem === "Rewards Redeemed" && (
            <div>
              <Grid columns={2} centered>
                {Object.keys(sortedRedeems).map(k => (
                  <Grid.Column key={k}>
                    <ActivityCard
                      activities={sortedRedeems[k]}
                      type={k}
                    ></ActivityCard>
                  </Grid.Column>
                ))}
              </Grid>
              {_.isEmpty(sortedRedeems) && (
                <div>
                  <br></br>
                  <Segment>
                    {_.isEmpty(sortedRewards) && (
                      <div> You are yet to earn your first Rewards! </div>
                    )}

                    {!_.isEmpty(sortedRewards) && (
                      <div> You are yet to redeem your Rewards! </div>
                    )}
                  </Segment>
                </div>
              )}
            </div>
          )}
        </Segment>
      </React.Fragment>
    );
  }
}

export default Activities;
