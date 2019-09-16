import React, { Component } from "react";
import { Divider } from "semantic-ui-react";
import AddBasket from "../common/addbasket";
import { saveBox } from "../utils/testRedeemBoxes";
import { getBoxes, updateBoxes } from "../services/accountService";

class Boxes extends Component {
  state = {
    editBasket: {},
    baskets: [],
    id: "5d7882687cab219112a4e31c"
  };

  async componentDidMount() {
    const { data } = await getBoxes(this.state.id);

    const baskets = [...Array(3)].map((d, index) => ({
      _id: index,
      name: data[index]
    }));

    console.log("baskets", baskets);

    this.setState({ baskets });
  }

  updateBasket = (id, value) => {
    let { baskets } = this.state;
    const foundIndex = baskets.findIndex(m => m._id === id);

    baskets[foundIndex].name = value;
    this.setState({ baskets });

    const boxes = baskets.map((d, index) => d.name);
    console.log("boxes", boxes);

    updateBoxes(this.state.id, boxes);

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

    console.log("render baskets", baskets, editBasket);

    return (
      <React.Fragment>
        {baskets.map(b => (
          <AddBasket
            key={b._id}
            basket={b}
            updateBasket={this.updateBasket}
            onEditClick={this.onEditClick}
            closeEdit={this.closeEdit}
            edit={editBasket._id === b._id}
          ></AddBasket>
        ))}
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
