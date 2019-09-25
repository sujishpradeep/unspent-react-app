import React, { Component } from "react";
import { Grid, Button, Item } from "semantic-ui-react";
import AddBasket from "../common/addbasket";
import { saveBox } from "../utils/testRedeemBoxes";
import { getBoxes, updateBoxes } from "../services/accountService";
import authservice from "../services/authservice";

var _ = require("lodash");

class Boxes extends Component {
  state = {
    editBasket: {},
    baskets: [],
    id: ""
  };

  async componentDidMount() {
    const token = authservice.getCurrentUser();
    const id = token && token.accountid;

    let { data } = await getBoxes(id);

    const baskets = [...Array(data.length + 1)].map((d, index) => ({
      _id: index,
      name: data[index]
    }));

    console.log("baskets", baskets);

    this.setState({ baskets, id });
  }

  updateBasket = async (id, value) => {
    let { baskets } = this.state;
    const foundIndex = baskets.findIndex(m => m._id === id);

    baskets[foundIndex].name = value;

    // baskets = [...Array(baskets.length)].map((b, index) => ({
    //   _id: index,
    //   name: baskets[index]
    // }));

    console.log(" update baskets", baskets.filter(b => b));

    this.setState({ baskets });

    const boxes = baskets.filter(b => b.name).map((d, index) => d.name);
    console.log(" update boxes", boxes);

    const baskets2 = [...Array(boxes.length + 1)].map((d, index) => ({
      _id: index,
      name: boxes[index]
    }));

    await updateBoxes(this.state.id, boxes);

    this.setState({ baskets: baskets2 });

    this.closeEdit();
  };

  onEditClick = id => {
    let { baskets } = this.state;
    const editBasket = baskets.find(m => m._id === id) || {};
    this.setState({ editBasket });
  };

  closeEdit = id => {
    this.setState({ editBasket: {} });
  };

  render() {
    const { baskets, editBasket } = this.state;

    let boxes = [...baskets];
    boxes = boxes.filter(b => b.name);

    if (boxes.length < 6) {
      boxes.push({ _id: boxes.length, name: "" });
    }
    console.log("render baskets", baskets, editBasket);

    const { isMobile } = this.props;

    const padding = isMobile ? "0" : "10vh";
    const styles = { padding: `0 ${padding}` };

    return (
      <React.Fragment>
        <div style={styles}>
          <Grid columns={2}>
            {boxes.map(b => (
              <Grid.Column style={{ height: "27vh" }}>
                <AddBasket
                  key={b._id}
                  basket={b}
                  updateBasket={this.updateBasket}
                  onEditClick={this.onEditClick}
                  closeEdit={this.closeEdit}
                  edit={editBasket._id === b._id}
                  isMobile={isMobile}
                ></AddBasket>
              </Grid.Column>
            ))}
          </Grid>
        </div>
        {/* <div
          style={{
            position: "relative",
            top: "100%",
            transform: "translateY(-50%)",
            textAlign: "center",
            margin: "auto"
          }}
        >
          <div className="add-button pointer">
            <div className="button-text"> + </div>
          </div>
        </div> */}
      </React.Fragment>
    );
  }
}

export default Boxes;

/*
<Button
                basic
                icon="pencil alternate"
                color="black"
                textAlign="center"
                attached="right"
              ></Button>
              <Header as="h2" className="inline black" textAlign="left">
                Add new basket
              </Header>
               <AddBasket
          key={"new"}
          basket={{ _id: "new" }}
          updateBasket={this.updateBasket}
          onEditClick={this.onEditClick}
          closeEdit={this.closeEdit}
          edit={editBasket._id === "new"}
        ></AddBasket>
*/
