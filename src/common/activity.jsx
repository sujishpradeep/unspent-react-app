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
              {" "}
              ${activity.amount}.00 {sign}{" "}
            </div>

            <Item.Meta>
              <span className="grey">
                <b>{activity.category || activity.box}</b>
              </span>
              <span className="ar ">
                <b className="black">{displayDate}</b>
                <Icon
                  name="calendar alternate outline"
                  className="black"
                ></Icon>
              </span>
            </Item.Meta>
            <Item.Description>
              <p className="black"> {activity.notes}</p>
            </Item.Description>
          </Item.Content>
        </Item>
      </Segment>
    );
  }
}

export default Activity;
