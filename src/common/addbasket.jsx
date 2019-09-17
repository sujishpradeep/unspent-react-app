import React, { Component } from "react";
import { Label, Segment, Button, Icon } from "semantic-ui-react";

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
    const color = secondary ? "grey" : "black";
    const opacity = secondary ? "0.4" : "0.9";

    return (
      <React.Fragment>
        <Segment
          className="pointer segmentinlinebox"
          onClick={event => {
            this.initialEdit();
            onEditClick(basket._id);
          }}
          style={{ height: "20vh", opacity: opacity }}
          textAlign="center"
          tertiary={secondary}
          raised={secondary}
        >
          <Label attached="top" color="black"></Label>

          {!edit && (
            <div
              style={{
                position: "relative",
                top: "30%",
                transform: "translateY(-50%)"
              }}
            >
              {!basket.name && <Icon name="plus"></Icon>}
              <p className={`ow big-font ${color}`}>
                {basket.name || "Add New"}
              </p>
            </div>
          )}

          {edit && (
            <textarea
              type="text"
              className="black big-font-mobile "
              value={basketValue}
              name="basketNew"
              style={{ minHeight: "12vh" }}
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
        </Segment>
        {edit && (
          <div style={{ marginTop: "0px" }}>
            <Segment.Inline>
              <Button
                icon
                basic
                color="grey"
                floated="right"
                onClick={() => updateBasket(basket._id, "")}
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
        )}
      </React.Fragment>
    );
  }
}

export default AddBasket;
