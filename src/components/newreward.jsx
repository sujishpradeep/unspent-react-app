import React, { Component } from "react";

import {
  Button,
  Modal,
  Form,
  Input,
  Dropdown,
  TextArea,
  Label,
  Icon,
  Segment,
  Menu
} from "semantic-ui-react";
import Moment from "moment";

import { DateInput } from "semantic-ui-calendar-react";
const Joi = require("joi");

class NewReward extends Component {
  state = {
    reward: {
      date: "",
      notes: "",
      amount: "",
      category: ""
    },
    errors: {},
    placeholder: "",
    currentDate: ""
  };

  handleSubmit = () => {
    const { error } = this.validateReward();
    if (error) {
      const errors = {};
      for (let item of error.details) errors[item.path[0]] = item.message;
      const formattedDate = Moment(
        this.state.reward.date,
        "Do MMM, YYYY"
      ).format("YYYY-MM-DD");

      if (!Moment(formattedDate, "YYYY-MM-DD", true).isValid()) {
        errors.date = "Invalid date";
      }
      this.setState({ errors: errors });
      return;
    }

    this.props.onRewardSubmit(this.state.reward);

    this.closeModal();
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  validateReward = () => {
    const { reward } = this.state;

    const schema = {
      category: Joi.string().required(),
      amount: Joi.number()
        .required()
        .min(0)
        .max(10000000),
      date: Joi.string().required(),
      notes: Joi.optional()
    };
    const options = { abortEarly: false };
    return Joi.validate(reward, schema, options);
  };

  handleChange = (event, { name, value }) => {
    if (this.state.reward.hasOwnProperty(name)) {
      let { reward, errors } = this.state;
      reward[name] = value;
      delete errors[name];
      this.setState({ reward, errors });
    }
  };

  loadModal = () => {
    const { currentDate } = this.props;
    let { reward, errors } = this.state;
    reward.category = "";
    reward.date = currentDate;
    reward.amount = "";
    errors = {};
    this.setState({
      showModal: true,
      placeholder: "You can write a short note on how you earned the reward",
      currentDate: currentDate,
      reward,
      errors
    });
  };

  render() {
    const { showModal, placeholder, reward, errors } = this.state;
    const { category } = reward;

    return (
      <React.Fragment>
        <Modal
          onClose={this.closeModal}
          open={showModal}
          trigger={
            <Button
              onClick={this.loadModal}
              circular
              textalign="center"
              basic
              icon="plus"
              color="black"
            ></Button>
          }
          centered={false}
          closeIcon
        >
          <Modal.Header>Add a New Reward</Modal.Header>

          <Modal.Content>
            <Form>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Amount Earned</label>
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
                      <Label pointing color="grey" basic>
                        Amount can't exeed 10,000,000
                      </Label>
                    )) ||
                    (errors.amount && (
                      <Label pointing color="grey" basic>
                        Amount can't be blank
                      </Label>
                    ))}
                </Form.Field>

                <Form.Field>
                  <DateInput
                    name="date"
                    placeholder="Date"
                    value={this.state.reward.date}
                    onChange={this.handleChange}
                    animation="none"
                    label="Date"
                    closable
                    maxDate={this.state.currentDate}
                    dateFormat="Do MMMM, YYYY"
                  />
                  {errors.date && (
                    <Label pointing color="grey" basic>
                      Invalid Date
                    </Label>
                  )}
                </Form.Field>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>Unspent Category</label>

                  <Menu vertical>
                    <Dropdown
                      text={category || "Select Category"}
                      item
                      onChange={this.handleChange}
                    >
                      <Dropdown.Menu>
                        <Dropdown.Item
                          icon="shopping cart"
                          text="Shopping"
                          name="category"
                          value="Shopping"
                          onClick={this.handleChange}
                        />
                        <Dropdown.Item
                          icon="film"
                          text="Entertainment"
                          name="category"
                          value="Entertainment"
                          onClick={this.handleChange}
                        />
                        <Dropdown.Item
                          icon="food"
                          text="Food / Drinks"
                          name="category"
                          value="Food / Drinks"
                          onClick={this.handleChange}
                        />
                        <Dropdown.Item
                          icon="car"
                          text="Travel"
                          name="category"
                          value="Travel"
                          onClick={this.handleChange}
                        />
                        <Dropdown.Item
                          icon="money bill alternate outline"
                          text="Miscellaneous"
                          name="category"
                          value="Miscellaneous"
                          onClick={this.handleChange}
                        />
                      </Dropdown.Menu>
                    </Dropdown>
                  </Menu>
                  {errors.category && (
                    <Label pointing color="grey" basic>
                      Category can't be blank
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
                  color="teal"
                  size="large"
                  circular
                  onClick={event => {
                    this.handleSubmit();
                  }}
                >
                  <Icon name="checkmark"></Icon>Done
                </Button>
                {/* <Button
                  content="Cancel"
                  floated="right"
                  basic
                  color="grey"
                  onClick={() =>
                    this.setState({
                      showModal: false
                    })
                  }
                /> */}
              </Segment.Inline>
            </Form>
          </Modal.Content>
        </Modal>
        <div>
          <span className="test block">Add Rewards </span>
        </div>
      </React.Fragment>
    );
  }
}

export default NewReward;
