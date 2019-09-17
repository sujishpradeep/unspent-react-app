import React, { Component } from "react";
import { Grid, Segment, Divider } from "semantic-ui-react";

import Moment from "moment";

// import {
//   getItem,
//   getItems,
//   saveItem,
//   deleteItem
// } from "../utils/testUnspentService";

import { saveItem } from "../utils/testUnspentService";

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
        <Segment>
          <Grid columns={2} relaxed="very">
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
          <Divider vertical> And</Divider>
        </Segment>
      </React.Fragment>
    );
  }
}

export default Unspend;

/*


<Segment>
          <Grid columns={2} relaxed="very">
            <Grid.Column textAlign="center">
              <NewReward
                currentDate={currentDate}
                onRewardSubmit={onRewardSubmit}
              ></NewReward>
            </Grid.Column>

            <Grid.Column textAlign="center">
              <NewRedeem currentDate={currentDate}></NewRedeem>
            </Grid.Column>
          </Grid>
          <Divider vertical> And</Divider>
        </Segment>

        */
