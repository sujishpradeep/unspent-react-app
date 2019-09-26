import React, { Component } from "react";
import { Header, Divider } from "semantic-ui-react";
import Unspend from "./unspend";

import Transactions from "./Transactions";

import Moment from "moment";

import { getAccount, addRedeem, addReward } from "../services/accountService";
import authservice from "../services/authservice";

class Rewards extends Component {
  state = { redeems: [], rewards: [], id: "", baskets: [], isLoading: true };

  handleRewardSubmit = async reward => {
    let rewards = [...this.state.rewards];

    const formattedDate = Moment(reward.date, "Do MMM, YYYY").format(
      "YYYY-MM-DD"
    );

    reward = {
      date: formattedDate,
      amount: Number(reward.amount),
      category: reward.category,
      notes: reward.notes,
      timestamp: Date.now()
    };

    rewards.push(reward);

    this.setState({ rewards });

    await addReward(this.state.id, reward);
  };

  handleRedeemSubmit = async redeem => {
    let redeems = [...this.state.redeems];
    const formattedDate = Moment(redeem.date, "Do MMM, YYYY").format(
      "YYYY-MM-DD"
    );

    redeem = {
      date: formattedDate,
      amount: Number(redeem.amount),
      box: redeem.box,
      notes: redeem.notes,
      timestamp: Date.now()
    };

    redeems.push(redeem);

    this.setState({ redeems });
    await addRedeem(this.state.id, redeem);
  };

  async componentDidMount() {
    const token = authservice.getCurrentUser();
    const id = token && token.accountid;
    const { data } = await getAccount(id);
    const { rewards, redeems } = data;

    const baskets = data.boxes.map((d, index) => ({
      _id: index,
      name: d
    }));

    this.setState({ rewards, redeems, id, baskets, isLoading: false });
  }

  getAmounts(rewards, redeems) {
    const grossRewards = rewards.map(r => r.amount).reduce((a, b) => a + b, 0);
    const grossUsage = redeems.map(r => r.amount).reduce((a, b) => a + b, 0);
    return {
      grossRewards,
      grossUsage,
      availableAmount: grossRewards - grossUsage
    };
  }

  getRecentActivity(rewards, redeems) {
    const allActivity = [...rewards, ...redeems];

    const activity = allActivity
      .sort(function(a, b) {
        return new Date(b.timestamp) - new Date(a.timestamp);
      })
      .slice(0, 5);
    return activity;
  }

  render() {
    const { rewards, redeems, baskets, isLoading } = this.state;

    if (isLoading) return <div style={{ height: "100%", width: "100%" }}></div>;
    const { grossRewards, grossUsage, availableAmount } = this.getAmounts(
      rewards,
      redeems
    );

    const transactions = this.getRecentActivity(rewards, redeems);
    return (
      <React.Fragment>
        <Header as="h2" className="ac"></Header>
        <Unspend
          onRewardSubmit={this.handleRewardSubmit}
          onRedeemSubmit={this.handleRedeemSubmit}
          availableAmount={availableAmount}
          grossRewards={grossRewards}
          grossUsage={grossUsage}
          baskets={baskets}
        ></Unspend>
        <Divider hidden></Divider>
        <Transactions transactions={transactions}></Transactions>
      </React.Fragment>
    );
  }
}

export default Rewards;
