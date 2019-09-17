import React, { Component } from "react";
import { Item, Icon, Divider, Segment, Header } from "semantic-ui-react";
import Moment from "moment";

class Activity extends Component {
  state = {};
  render() {
    const { activity } = this.props;
    const displayDate = Moment(activity.date, "YYYY-MM-DD").format(
      "Do MMM, YYYY"
    );

    const sign = activity.category ? "+" : "-";
    return (
      <Segment>
        <Item>
          <Item.Content>
            <div className="head inline black">
              {sign} ${activity.amount}.00
            </div>
            <span className="ar black">
              {displayDate}
              <Icon name="calendar alternate outline"></Icon>
            </span>

            <Item.Meta>
              <span className="black">{activity.category || activity.box}</span>
            </Item.Meta>

            <Item.Description>
              <p className="grey ow">{activity.notes}</p>
            </Item.Description>
          </Item.Content>
        </Item>
      </Segment>
    );
  }
}

export default Activity;
