import React, { Component } from "react";
import { Grid, Header, Item, Menu, Segment } from "semantic-ui-react";
var _ = require("lodash");

class User extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  componentDidMount() {
    const activeItem = "Rewards Earned";
    this.setState({ activeItem });
  }

  sort = array => {
    return _.groupBy(array, "category");
  };
  render() {
    const { rewards, redeems } = this.props;

    const sortedRewards = this.sort(rewards);
    console.log("rewards", rewards);
    console.log("sorted array", sortedRewards);
    Object.keys(sortedRewards).map(k => console.log(sortedRewards[k]));

    const { activeItem } = this.state;

    return (
      <React.Fragment>
        <Segment raised>
          <Menu secondary>
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
          <Grid columns={1} centered>
            {Object.keys(sortedRewards).map(k => (
              <Grid.Column>
                <Segment textAlign="center">
                  <Header as="h2">
                    {k}
                    <Header.Subheader>$200.00</Header.Subheader>
                  </Header>
                </Segment>
              </Grid.Column>
            ))}
          </Grid>
        </Segment>
      </React.Fragment>
    );
  }
}

export default User;
