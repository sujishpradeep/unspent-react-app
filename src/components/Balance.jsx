import React, { Component } from "react";
import { Grid, Segment, Header, Icon } from "semantic-ui-react";

class Balance extends Component {
  state = {};
  render() {
    const { availableAmount } = this.props;
    return (
      <React.Fragment>
        <Grid>
          <Grid.Column width={5}></Grid.Column>
          <Grid.Column width={6}>
            <Segment>
              <Header as="h2" textAlign="center">
                <Header.Content>
                  <Icon name="credit card outline" size="big"></Icon>
                  <div className="black">${availableAmount} </div>
                  <Header.Subheader> Avaialable</Header.Subheader>
                </Header.Content>
              </Header>
            </Segment>
          </Grid.Column>
          <Grid.Column width={5}></Grid.Column>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Balance;
