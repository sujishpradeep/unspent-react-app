import React, { Component } from "react";
import { Item, Segment, Grid, Icon } from "semantic-ui-react";
import Moment from "moment";

class RecentActivity extends Component {
  state = {};
  render() {
    const { activity } = this.props;
    const displayDate = Moment(activity.date, "YYYY-MM-DD").format(
      "Do MMM, YYYY"
    );

    const sign = activity.category ? "+" : "-";
    // const icon = activity.category ? "newspaper outline" : "gg";
    const icon = activity.category ? "tags" : "check square";
    return (
      <Segment>
        {/* <Divider></Divider> */}

        <Grid columns={2}>
          <Grid.Column width={9}>
            <Item>
              <Item.Content>
                <div className="activity-span black inline">
                  {activity.category || activity.box}
                </div>
              </Item.Content>
            </Item>
          </Grid.Column>

          <Grid.Column width={7}>
            <div
              className="inline activity-amount black"
              style={{ color: "black", float: "right", verticalAlign: "0" }}
            >
              {`${sign} ${activity.amount}.00`}{" "}
              <Icon name={icon} color="grey"></Icon>
            </div>
          </Grid.Column>
        </Grid>
        <Item.Description>
          <div className=" ow grey">{displayDate}</div>
          <div className="black activitynotes">{activity.notes}</div>
        </Item.Description>
      </Segment>
    );
  }
}

export default RecentActivity;

{
  /* <Label color={color} horizontal size="large">
            
            </Label> */
}
{
  /* <div className="head inline ">${activity.amount}.00</div> */
}
{
  /* <Item.Meta>
              {/* <span className="black">{activity.category || activity.box}</span> */
}
{
  /* {displayDate} */
}
{
  /* <Icon name="calendar alternate outline"></Icon> */
}
{
  /* </Item.Meta> */
}
{
  /* <Item.Description>
              <p className=" ow grey">{activity.notes}</p>
            </Item.Description> */
}
