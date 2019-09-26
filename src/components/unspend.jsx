import React from "react";
import { Grid, Segment } from "semantic-ui-react";

import Moment from "moment";

import NewReward from "./newreward";
import NewRedeem from "./newredeem";

class Unspend extends NewReward {
  state = {
    currentDate: ""
  };

  componentDidMount() {
    const today = new Date();

    let currentDate =
      today.getDate() +
      "/" +
      parseInt(today.getMonth() + 1) +
      "/" +
      today.getFullYear();

    currentDate = Moment(currentDate, "DD/MM/YYYY").format("Do MMM, YYYY");

    this.setState({ currentDate });
  }

  render() {
    const { currentDate } = this.state;
    const {
      onRewardSubmit,
      availableAmount,
      grossRewards,
      grossUsage,
      onRedeemSubmit,
      baskets
    } = this.props;

    return (
      <React.Fragment>
        <Segment raised>
          <Grid columns={2} relaxed="very" divided>
            <Grid.Column textAlign="center">
              <NewReward
                currentDate={currentDate}
                onRewardSubmit={onRewardSubmit}
                grossRewards={grossRewards}
              ></NewReward>
            </Grid.Column>

            <Grid.Column textAlign="center">
              <NewRedeem
                currentDate={currentDate}
                availableAmount={availableAmount}
                grossUsage={grossUsage}
                onRedeemSubmit={onRedeemSubmit}
                baskets={baskets}
              ></NewRedeem>
            </Grid.Column>
          </Grid>
        </Segment>
      </React.Fragment>
    );
  }
}

export default Unspend;
