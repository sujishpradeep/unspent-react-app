import React, { Component } from "react";

import { Item, Icon, Divider, Segment, Header, Grid } from "semantic-ui-react";
import RecentActivity from "../common/recentactivity";

var _ = require("lodash");

class Transactions extends Component {
  state = {};
  render() {
    const { transactions } = this.props;
    return (
      <React.Fragment>
        <Segment raised padded>
          {_.isEmpty(transactions) && (
            <div>
              <Grid columns={2} verticalAlign="middle">
                <Grid.Column>
                  <Header as="h1" color="teal" style={{ textAlign: "center" }}>
                    Getting Started With
                    <div
                      className="satisfy-font "
                      style={{ fontSize: "35px", paddingTop: "10px" }}
                    >
                      #Unspent
                    </div>
                  </Header>
                </Grid.Column>

                <Grid.Column>
                  <Grid columns={1}>
                    <Grid.Column>
                      <Header as="h4" color="teal">
                        <Icon name="tags" color="teal"></Icon>
                        Add Rewards
                      </Header>
                    </Grid.Column>
                    <Grid.Column>
                      <Header as="h4" color="teal">
                        <Icon name="box" color="teal" size="big"></Icon>
                        Enter Redeem Box
                      </Header>
                    </Grid.Column>
                    <Grid.Column>
                      <Header as="h4" color="teal">
                        <Icon name="check square" color="teal"></Icon>
                        Redeem Rewards
                      </Header>
                    </Grid.Column>
                  </Grid>
                </Grid.Column>
              </Grid>
              <Divider vertical>
                <Icon name="hand point right outline" color="grey"></Icon>
              </Divider>
            </div>
          )}
          {!_.isEmpty(transactions) && (
            <div>
              <Header as="h3" color="teal">
                <Icon name="angle double right" color="teal"></Icon>
                Recent Activity
              </Header>
              <Item.Group>
                {transactions.map((t, index) => (
                  <RecentActivity key={index} activity={t}></RecentActivity>
                ))}
              </Item.Group>
            </div>
          )}
        </Segment>
      </React.Fragment>
    );
  }
}

export default Transactions;
