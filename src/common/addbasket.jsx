import React, { Component } from "react";
import { Grid, Segment, Button, Icon, Input } from "semantic-ui-react";

class AddBasket extends Component {
  state = { basketNew: "" };

  handleChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };

  initialEdit = () => {
    const { basket } = this.props;

    const basketNew = basket.name;

    this.setState({ basketNew });
  };

  render() {
    let { updateBasket, onEditClick, edit, closeEdit, basket } = this.props;

    const basketValue = edit ? this.state.basketNew : basket.name;

    const secondary = !edit && !basket.name;

    return (
      <React.Fragment>
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column>
              <Segment
                className="pointer"
                onClick={event => {
                  this.initialEdit();
                  onEditClick(basket._id);
                }}
                basic={secondary}
              >
                {!edit && basket.name && (
                  <div>
                    <Icon name="pencil alternate"></Icon>
                    <span className="black big-font">
                      {basket.name || "Add New"}
                    </span>
                  </div>
                )}

                {!edit && !basket.name && (
                  <div>
                    <Icon name="plus"></Icon>
                    <span className="black big-font">
                      {basket.name || "Add New"}
                    </span>
                  </div>
                )}
                {edit && (
                  <div>
                    <Input
                      autoFocus
                      fluid
                      type="text"
                      onChange={this.handleChange}
                      className="black big-font"
                      value={basketValue}
                      name="basketNew"
                      transparent
                    />
                  </div>
                )}
              </Segment>
              {edit && (
                <Segment.Inline>
                  <Button
                    icon
                    basic
                    color="black"
                    floated="right"
                    onClick={() => closeEdit(basket._id)}
                  >
                    <Icon name="undo"></Icon>
                  </Button>
                  <Button
                    icon
                    basic
                    color="black"
                    floated="right"
                    onClick={() => updateBasket(basket._id, basketValue)}
                  >
                    <Icon name="checkmark"></Icon>
                  </Button>
                </Segment.Inline>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}

export default AddBasket;

/*
<div>
                  <span onClick={() => updateBasket(basket._id, basketValue)}>
                    <Icon name="checkmark" bordered />
                  </span>
                  <span> </span>
                  <span onClick={() => closeEdit(basket._id)}>
                    <Icon name="close" bordered />
                  </span>
                </div>

                <Input
                  autoFocus
                  fluid
                  type="text"
                  onChange={this.handleChange}
                  value={basket}
                  icon={<Icon name="check" link onClick={this.test} />}
                  transparent
                />

      <Modal
        large
        onClose={this.closeModal}
        trigger={
          <Grid>
            <Grid.Row columns={1}>
              <Grid.Column>
                <Segment textAlign="justified" className="pointer">
                  <Icon name="pencil alternate"></Icon>
                  <span className="black big-font"> {basket}</span>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        }
        centered={false}
      >
        <Modal.Content form>
          <Segment.Inline>
            <Form>
              <Form.Field inline>
                <Input
                  autoFocus
                  fluid
                  type="text"
                  onChange={this.handleChange}
                  value={basket}
                  icon={<Icon name="check" link onClick={this.test} />}
                />
              </Form.Field>
            </Form>
          </Segment.Inline>
        </Modal.Content>
      </Modal>
      */
