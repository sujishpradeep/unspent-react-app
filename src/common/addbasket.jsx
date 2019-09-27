import React, { Component } from "react";
import { Modal, Button, Icon } from "semantic-ui-react";
import OutsideClickHandler from "react-outside-click-handler";

class AddBasket extends Component {
  state = { basketNew: "" };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  initialEdit = () => {
    const { basket } = this.props;

    const basketNew = basket.name;

    this.setState({ basketNew });
  };

  close = () => this.setState({ open: false });

  render() {
    let { updateBasket, onEditClick, edit, basket } = this.props;

    const basketValue = edit ? this.state.basketNew : basket.name;

    const secondary = !edit && !basket.name;
    const color = secondary ? "#FFFFFf" : "#FFFFFf";

    const buttonmargin = this.props.isMobile ? "16px" : "17px";

    return (
      <React.Fragment>
        {basket.name && (
          <Modal
            open={this.state.open}
            onClose={this.close}
            trigger={
              <div
                className="thickborder  segmentinlinebox pointer"
                onClick={event => {
                  this.initialEdit();
                  this.setState({ open: true });
                }}
                style={{
                  height: "20vh",
                  padding: " 0 2.5px",
                  textAlign: "center"
                }}
              >
                <div
                  style={{
                    position: "relative",
                    top: "50%",
                    transform: "translateY(-50%)"
                  }}
                >
                  {basket.name && (
                    <p className={`ow big-font ${color}`}>
                      {basket.name || "Add a new box"}
                    </p>
                  )}
                </div>
              </div>
            }
            closeIcon
            size="mini"
            // dimmer="blurring"
            centered={false}
          >
            <Modal.Content>
              <div style={{ textAlign: "center", fontSize: "25px" }}>
                {basket.name}
              </div>
            </Modal.Content>
            <Modal.Actions>
              <Button
                size="small"
                color="red"
                onClick={e => {
                  e.stopPropagation();
                  this.close();
                  updateBasket(basket._id, "");
                }}
                floated="left"
              >
                <Icon name="trash alternate outline" /> Delete Box
              </Button>
            </Modal.Actions>
          </Modal>
        )}

        {!basket.name && (
          <div
            className="thickborder  segmentinlinebox pointer"
            onClick={event => {
              this.initialEdit();
              onEditClick(basket._id);
            }}
            style={{
              height: "20vh",
              textAlign: "center"
            }}
          >
            {!edit && (
              <div
                style={{
                  position: "relative",
                  top: "50%",
                  transform: "translateY(-50%)"
                }}
              >
                <Icon name="box" className="teal" size="big"></Icon>

                <div
                  className={`ow big-font teal`}
                  style={{ marginTop: "10px", fontWeight: "bold" }}
                >
                  Click to Add a{" "}
                  <div style={{ marginTop: "-5px" }}>New Box</div>
                </div>
              </div>
            )}

            <OutsideClickHandler
              onOutsideClick={() => {
                this.props.closeEdit();
              }}
            >
              {edit && (
                <textarea
                  type="text"
                  className="black big-font "
                  value={basketValue}
                  name="basketNew"
                  style={{
                    minHeight: "18vh"
                  }}
                  onChange={this.handleChange}
                  maxLength={50}
                  autoFocus
                  onFocus={e => {
                    var temp_value = e.target.value;
                    e.target.value = "";
                    e.target.value = temp_value;
                  }}
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      updateBasket(basket._id, basketValue);
                    }
                  }}
                />
              )}
              }
              {edit && (
                <div style={{ marginTop: `${buttonmargin}` }}>
                  <Button
                    icon
                    color="grey"
                    basic
                    floated="right"
                    onClick={e => {
                      e.stopPropagation();
                      updateBasket(basket._id, "");
                    }}
                    size="tiny"
                  >
                    <Icon name="undo alternate"></Icon>
                  </Button>
                  <Button
                    icon="checkmark"
                    color="teal"
                    floated="left"
                    onClick={e => {
                      e.stopPropagation();
                      updateBasket(basket._id, basketValue);
                    }}
                    size="tiny"
                  ></Button>
                </div>
              )}
            </OutsideClickHandler>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default AddBasket;
