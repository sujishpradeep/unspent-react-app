import React, { Component } from "react";
import { Header, Divider } from "semantic-ui-react";
import Unspend from "./unspend";
import Balance from "./Balance";
import Transactions from "./Transactions";
import { saveItem, getItems } from "../utils/testUnspentService";
import Moment from "moment";
import Activity from "../common/activity";
import { getAccount, addRedeem, addReward } from "../services/accountService";

class Rewards extends Component {
  state = { redeems: [], rewards: [], id: "5d7882687cab219112a4e31c" };

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
    const id = this.state.id;
    const { data } = await getAccount(id);
    const { rewards } = data;
    const { redeems } = data;

    this.setState({ rewards, redeems });
  }

  getAmounts(rewards, redeems) {
    console.log("rewards", rewards);
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

    console.log("activity", activity);
    return activity;
  }

  render() {
    const { rewards, redeems, id } = this.state;
    const { grossRewards, grossUsage, availableAmount } = this.getAmounts(
      rewards,
      redeems
    );

    const transactions = this.getRecentActivity(rewards, redeems);
    console.log("grossRewards", grossRewards);
    return (
      <React.Fragment>
        <Header as="h2" className="ac"></Header>
        <Unspend
          onRewardSubmit={this.handleRewardSubmit}
          onRedeemSubmit={this.handleRedeemSubmit}
          availableAmount={availableAmount}
          grossRewards={grossRewards}
          grossUsage={grossUsage}
          id={id}
        ></Unspend>
        <Divider hidden></Divider>
        <Divider hidden></Divider>
        <Divider hidden></Divider>
        <Divider hidden></Divider>
        <Balance availableAmount={availableAmount}></Balance>
        <Divider hidden></Divider>
        <Divider hidden></Divider>
        <Transactions transactions={transactions}></Transactions>
      </React.Fragment>
    );
  }
}

export default Rewards;
