import React, { Component } from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";

class User extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <h1>
          {/* <div className="card-header">User Profile</div>

          <Modal trigger={<Button>Show Modal</Button>}>
            <Modal.Header>Select a Photo</Modal.Header>
            <Modal.Content image>
              <Image
                wrapped
                size="medium"
                src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
              />
              <Modal.Description>
                <Header>Default Profile Image</Header>
                <p>
                  We've found the following gravatar image associated with your
                  e-mail address.
                </p>
                <p>Is it okay to use this photo?</p>
              </Modal.Description>
            </Modal.Content>
          </Modal> */}
        </h1>
      </React.Fragment>
    );
  }
}

export default User;
