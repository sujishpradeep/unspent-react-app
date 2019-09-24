import React, { Component } from "react";
import { Grid, Header, Item, Menu, Segment } from "semantic-ui-react";
import ActivityCard from "./activitycard";
var _ = require("lodash");

class Activities extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  componentDidMount() {
    const activeItem = "Rewards Earned";
    this.setState({ activeItem });
  }

  sort = (array, property) => {
    return _.groupBy(array, property);
  };
  render() {
    const { rewards, redeems } = this.props;

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
              name="Rewards Spent"
              active={activeItem === "Rewards Spent"}
              onClick={this.handleItemClick}
              textAlign="right"
            />
          </Menu>
          <Grid></Grid>

          {activeItem === "Rewards Earned" && (
            <Grid columns={2} centered>
              {Object.keys(sortedRewards).map(k => (
                <Grid.Column>
                  <ActivityCard
                    key={k}
                    activities={sortedRewards[k]}
                    type={k}
                  ></ActivityCard>
                </Grid.Column>
              ))}
            </Grid>
          )}
          {activeItem === "Rewards Spent" && (
            <Grid columns={2} centered>
              {Object.keys(sortedRedeems).map(k => (
                <Grid.Column>
                  <ActivityCard
                    key={k}
                    activities={sortedRedeems[k]}
                    type={k}
                  ></ActivityCard>
                </Grid.Column>
              ))}
            </Grid>
          )}
        </Segment>
      </React.Fragment>
    );
  }
}

export default Activities;
