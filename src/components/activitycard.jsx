import React, { Component } from "react";
import { Header, Segment, Modal, Item, Icon, Grid } from "semantic-ui-react";

import Moment from "moment";
import HeaderSubHeader from "semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader";

class ActivityCard extends Component {
  state = {};

  closeModal = () => {
    this.setState({ showModal: false });
  };

  loadModal = () => {
    this.setState({
      showModal: true
    });
  };

  render() {
    const { activities, type } = this.props;
    const { showModal } = this.state;

    console.log("Activities", activities);
    const total = activities.reduce((a, b) => +a + +b.amount, 0);

    const icon = activities[0].category ? "tags" : "check square";

    return (
      <Modal
        onClose={this.closeModal}
        open={showModal}
        trigger={
          <Segment onClick={this.loadModal} className="pointer">
            <Icon name="chevron circle right" color="teal"></Icon>
            {/* <Icon name="play circle" color="teal"></Icon> */}
            <div className="activityheader black inline">{type}</div>

            <div className="activitysubheader ow">+{total}.00</div>
          </Segment>
        }
        closeIcon
        centered={false}
        size="mini"
      >
        <Header> All Activities - {type}</Header>

        <Modal.Content scrolling>
          {activities.map(a => (
            <Segment>
              <Item>
                <Item.Content>
                  <Icon name={icon} color="grey"></Icon>
                  {a.amount}.00
                  <span className="ar black">
                    {Moment(a.date, "YYYY-MM-DD").format("Do MMM, YYYY")}
                  </span>
                </Item.Content>
                <Item.Description>
                  <div className="ow grey">{a.notes}</div>
                </Item.Description>
              </Item>
            </Segment>
          ))}
        </Modal.Content>
      </Modal>
    );
  }
}

export default ActivityCard;
