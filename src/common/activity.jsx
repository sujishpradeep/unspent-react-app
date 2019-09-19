import React, { Component } from "react";
import { Item, Icon, Divider, Segment, Header, Label } from "semantic-ui-react";
import Moment from "moment";

class Activity extends Component {
  state = {};
  render() {
    const { activity } = this.props;
    const displayDate = Moment(activity.date, "YYYY-MM-DD").format(
      "Do MMM, YYYY"
    );

    const sign = activity.category ? "+" : "-";
    const color = activity.category ? "blue" : "pink";
    return (
      <Segment>
        {/* <Divider></Divider> */}
        <Item>
          <Item.Content>
            {/* <Label color={color} horizontal size="large">
            
            </Label> */}

            <Label color={color} key={color}>
              {`${sign} ${activity.amount}.00`}
            </Label>

            {/* <div className="head inline ">${activity.amount}.00</div> */}
            <span className="ar black">
              {displayDate}
              <Icon name="calendar alternate outline"></Icon>
            </span>

            <Item.Meta>
              {/* <span className="black">{activity.category || activity.box}</span> */}
              <span className="black">{activity.category || activity.box}</span>
            </Item.Meta>
            <Item.Description>
              <p className=" ow">{activity.notes}</p>
            </Item.Description>
          </Item.Content>
        </Item>
      </Segment>
    );
  }
}

export default Activity;
