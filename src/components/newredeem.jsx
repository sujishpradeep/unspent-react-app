import React, { Component } from "react";

import {
  Button,
  Modal,
  Form,
  Input,
  Dropdown,
  TextArea,
  Label,
  Header,
  Segment,
  Menu,
  Message
} from "semantic-ui-react";

import { DateInput } from "semantic-ui-calendar-react";
import Rewards from "./rewards";

const Joi = require("joi");

class NewRedeem extends Component {
  state = {
    baskets: [],
    redeem: {
      date: "",
      notes: "",
      amount: "",
      box: ""
    },
    errors: {},
    placeholder: "",
    currentDate: "",
    availableAmount: ""
  };

  handleSubmit = () => {
    const { error } = this.validateRedeem();
    if (error) {
      const errors = {};
      for (let item of error.details) errors[item.path[0]] = item.message;
      this.setState({ errors });
      return;
    }

    this.props.onRedeemSubmit(this.state.redeem);

    this.closeModal();
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  validateRedeem = () => {
    const { redeem } = this.state;

    const schema = {
      box: Joi.string().required(),
      amount: Joi.number()
        .required()
        .min(0)
        .max(this.props.availableAmount),
      date: Joi.string().required(),
      notes: Joi.optional()
    };
    const options = { abortEarly: false };
    return Joi.validate(redeem, schema, options);
  };

  handleChange = (event, { name, value }) => {
    if (this.state.redeem.hasOwnProperty(name)) {
      let { redeem, errors } = this.state;
      redeem[name] = value;
      delete errors[name];
      this.setState({ redeem, errors });
    }
  };

  loadModal = async () => {
    const { currentDate, availableAmount, baskets } = this.props;
    let { redeem, errors } = this.state;
    redeem.box = "";
    redeem.date = currentDate;
    redeem.amount = "";

    console.log("redeem baskets", baskets);

    errors = {};
    this.setState({
      showModal: true,
      placeholder: " You can write a short description on the redemption",
      currentDate: currentDate,
      redeem,
      errors,
      baskets,
      availableAmount
    });
  };

  render() {
    const {
      showModal,
      placeholder,
      redeem,
      errors,
      baskets,
      availableAmount
    } = this.state;
    const { box } = redeem;
    console.log("errors", errors);

    const { grossUsage } = this.props;

    return (
      <React.Fragment>
        {/* <Header as="h2" textAlign="center">
          <Header.Content>
            <div className="inline">${grossUsage}.00</div>
            <Header.Subheader>
              <div className="inline">Redeemed</div>
            </Header.Subheader>
          </Header.Content>
        </Header> */}

        <Modal
          onClose={this.closeModal}
          open={showModal}
          trigger={
            <Button
              onClick={this.loadModal}
              circular
              textalign="center"
              color="black"
              basic
              icon="plus"
            ></Button>
          }
          centered={false}
        >
          <Modal.Header>Add a new spending</Modal.Header>

          <Modal.Content>
            <Form>
              <Form.Field>
                <Label basic color="black">
                  Rewards Available - {availableAmount}
                </Label>
              </Form.Field>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>New Spent Amount </label>
                  <Input
                    labelPosition="right"
                    type="text"
                    placeholder="Amount"
                    onChange={this.handleChange}
                  >
                    <Input
                      onChange={this.handleChange}
                      name="amount"
                      pattern="[0-9]*"
                      type="number"
                    ></Input>
                    <Label basic>.00</Label>
                  </Input>
                  {(errors.amount &&
                    errors.amount.startsWith(
                      `"amount" must be less than or equal`
                    ) && (
                      <Label pointing color="red" basic>
                        Amount cannot exceed available rewards amount
                      </Label>
                    )) ||
                    (errors.amount && (
                      <Label pointing color="red" basic>
                        Amount can't be blank
                      </Label>
                    ))}
                </Form.Field>

                <Form.Field>
                  <DateInput
                    name="date"
                    placeholder="Date"
                    value={this.state.redeem.date}
                    onChange={this.handleChange}
                    animation="none"
                    label="Date"
                    closable
                    maxDate={this.state.currentDate}
                    dateFormat="Do MMMM, YYYY"
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Redeem box </label>

                  <Dropdown
                    text={box || "Select the Redeem Box"}
                    selection
                    onChange={this.handleChange}
                    fluid
                  >
                    <Dropdown.Menu fluid>
                      {baskets.map(
                        (d, index) =>
                          d.name && (
                            <Dropdown.Item
                              text={d.name}
                              name="box"
                              key={index}
                              value={d.name}
                              onClick={this.handleChange}
                            />
                          )
                      )}
                    </Dropdown.Menu>
                  </Dropdown>

                  {errors.box && (
                    <Label pointing color="red" basic>
                      Box can't be blank
                    </Label>
                  )}
                </Form.Field>
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field
                  name="notes"
                  id="form-textarea-control-opinion"
                  control={TextArea}
                  label="Quick Notes"
                  placeholder={placeholder}
                  onChange={this.handleChange}
                ></Form.Field>
              </Form.Group>

              <Segment.Inline>
                <Button
                  basic
                  color="black"
                  onClick={event => {
                    this.handleSubmit();
                  }}
                >
                  Done
                </Button>
                <Button
                  content="Cancel"
                  floated="right"
                  basic
                  color="black"
                  onClick={() =>
                    this.setState({
                      showModal: false
                    })
                  }
                />
              </Segment.Inline>
            </Form>
          </Modal.Content>
        </Modal>
        <div>
          <span className="test block">Rewards Spent</span>
        </div>
      </React.Fragment>
    );
  }
}

export default NewRedeem;
