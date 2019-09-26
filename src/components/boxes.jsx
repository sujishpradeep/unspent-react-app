import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import AddBasket from "../common/addbasket";
import { getBoxes, updateBoxes } from "../services/accountService";
import authservice from "../services/authservice";

class Boxes extends Component {
  state = {
    editBasket: {},
    baskets: [],
    id: "",
    isLoading: true
  };

  async componentDidMount() {
    const token = authservice.getCurrentUser();
    const id = token && token.accountid;

    let { data } = await getBoxes(id);

    const baskets = [...Array(data.length + 1)].map((d, index) => ({
      _id: index,
      name: data[index]
    }));

    this.setState({ baskets, id, isLoading: false });
  }

  updateBasket = async (id, value) => {
    let { baskets } = this.state;
    const foundIndex = baskets.findIndex(m => m._id === id);

    baskets[foundIndex].name = value;

    const boxes = baskets.filter(b => b.name).map((d, index) => d.name);

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
    const { baskets, editBasket, isLoading } = this.state;

    if (isLoading) return <div style={{ height: "100%", width: "100%" }}></div>;

    let boxes = [...baskets];
    boxes = boxes.filter(b => b.name);

    if (boxes.length < 6) {
      boxes.push({ _id: boxes.length, name: "" });
    }

    const { isMobile } = this.props;

    const padding = isMobile ? "0" : "10vh";
    const styles = { padding: `0 ${padding}` };

    return (
      <React.Fragment>
        <div style={styles}>
          <Grid columns={2}>
            {boxes.map((b, index) => (
              <Grid.Column style={{ height: "27vh" }} key={b._id}>
                <AddBasket
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
      </React.Fragment>
    );
  }
}

export default Boxes;
