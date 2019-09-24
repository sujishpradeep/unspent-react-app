import React, { Component } from "react";

import { Item, Icon, Divider, Segment, Header } from "semantic-ui-react";
import RecentActivity from "../common/recentactivity";

class Transactions extends Component {
  state = {};
  render() {
    const { transactions } = this.props;
    return (
      <React.Fragment>
        <Segment raised>
          <Header as="h3" color="teal">
            <Icon name="angle double right" color="teal"></Icon>
            Recent Activity
          </Header>
          <Item.Group>
            {transactions.map((t, index) => (
              <RecentActivity key={index} activity={t}></RecentActivity>
            ))}
          </Item.Group>
        </Segment>
      </React.Fragment>
    );
  }
}

export default Transactions;

/*

<Label as="a" ribbon size="big" color="brown">
            <div className="brown">Transactions</div>
          </Label>

          */
