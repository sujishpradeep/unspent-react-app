import React, { Component } from "react";

import { Item, Icon, Divider, Segment, Header } from "semantic-ui-react";
import Activity from "../common/activity";

class Transactions extends Component {
  state = {};
  render() {
    const { transactions } = this.props;
    return (
      <React.Fragment>
        <Segment raised>
          <Header as="h3" color="black">
            <Icon name="angle double right" className="black"></Icon>
            Recent Activity
          </Header>
          <Divider hidden></Divider>

          <Item.Group>
            {transactions.map((t, index) => (
              <Activity key={index} activity={t}></Activity>
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
