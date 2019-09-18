import React, { Component } from "react";
import { Label, Segment, Button, Icon } from "semantic-ui-react";
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

  render() {
    let { updateBasket, onEditClick, edit, basket } = this.props;

    const basketValue = edit ? this.state.basketNew : basket.name;

    const secondary = !edit && !basket.name;
    const color = secondary ? "#FFFFFf" : "#FFFFFf";
    const opacity = secondary ? "0.5" : "0.9";
    const buttonmargin = this.props.isMobile ? "8px" : "10px";

    return (
      <div>
        {secondary && (
          <div
            style={{
              position: "relative",
              top: "100%",
              transform: "translateY(-50%)",
              textAlign: "center",
              margin: "auto"
            }}
          >
            <div
              className="add-button pointer"
              onClick={event => {
                this.initialEdit();
                onEditClick(basket._id);
              }}
            >
              <div className="button-text"> + </div>
            </div>
          </div>
        )}

        {!secondary && (
          <React.Fragment>
            <div className="box-money ">
              <b>$250.00 </b>
            </div>
            <div
              className="thickborder pointer segmentinlinebox"
              onClick={event => {
                this.initialEdit();
                onEditClick(basket._id);
              }}
              style={{ height: "20vh", opacity: opacity, textAlign: "center" }}
            >
              {/* <Segment
            className="pointer segmentinlinebox"
            onClick={event => {
              this.initialEdit();
              onEditClick(basket._id);
            }}
            style={{ height: "20vh", opacity: opacity }}
            textAlign="center"
            basic
            floated
          > */}

              {!edit && (
                <div
                  style={{
                    position: "relative",
                    top: "50%",
                    transform: "translateY(-50%)"
                  }}
                >
                  <p className={`ow big-font ${color}`}>
                    {basket.name || "Add New"}
                  </p>
                  {/* {!basket.name && <Icon name=" add " size="big"></Icon>} */}
                </div>
              )}

              {edit && (
                <OutsideClickHandler
                  onOutsideClick={() => {
                    console.log("close edit");
                    this.props.closeEdit();
                  }}
                >
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
                  <div style={{ marginTop: `${buttonmargin}` }}>
                    <Button
                      icon
                      color="pink"
                      floated="right"
                      //onClick={(e) => e.stopPropagation(); updateBasket(basket._id, "")}
                      onClick={e => {
                        e.stopPropagation();
                        updateBasket(basket._id, "");
                      }}
                      size="tiny"
                    >
                      <Icon name="trash alternate outline "></Icon>
                    </Button>
                    <Button
                      icon="checkmark"
                      color="pink"
                      floated="left"
                      onClick={e => {
                        e.stopPropagation();
                        updateBasket(basket._id, basketValue);
                      }}
                      size="tiny"
                    ></Button>
                  </div>
                </OutsideClickHandler>
              )}
              {/* </Segment> */}
            </div>
          </React.Fragment>
        )}
        {/* {edit && (
          <div style={{ marginTop: "10px" }}>
            <Segment.Inline>
              <Button
                icon
                basic
                color="grey"
                floated="right"
                //onClick={(e) => e.stopPropagation(); updateBasket(basket._id, "")}
                onClick={e => {
                  e.stopPropagation();
                  updateBasket(basket._id, "");
                }}
              >
                <Icon name="trash alternate outline "></Icon>
              </Button>
              <Button
                icon="checkmark"
                basic
                color="black"
                onClick={() => updateBasket(basket._id, basketValue)}
              ></Button>
            </Segment.Inline>
          </div>
        )} */}
      </div>
    );
  }
}

export default AddBasket;
