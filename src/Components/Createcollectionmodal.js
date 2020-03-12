import React, { Component } from "react";
import { Button, Modal, Input, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { addCollection } from "../actions/collectionsactions";

class CreateCollectionModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      value: "",
      collections: []
    };
  }

  componentDidMount() {
    let collections = [];
    this.props.collections.map((value, index) =>
      value.user.username === this.props.currentUser.username
        ? collections.push(value.name)
        : ""
    );
    this.setState({ collections: collections });
  }

  handleOpen = () => {
    console.log(this.state.collections, "a");
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleChange(e) {
    console.log(this.state, "b");
    this.setState({ value: e.target.value });
  }

  handleClick() {
    this.props.addCollection(this.props.currentUser.id, this.state.value);
    this.setState({ value: "" });
  }

  render() {
    return (
      <Modal
        size="mini"
        onOpen={this.handleOpen}
        open={this.state.isOpen}
        onClose={this.handleClose}
        trigger={<Button attached="top">Create New Collection</Button>}
      >
        <Modal.Header>Create a new collecion</Modal.Header>
        <Modal.Content>
          <Input
            focus
            placeholder="Collection Name"
            onChange={e => this.handleChange(e)}
          />
          {this.state.collections.includes(this.state.value) ? (
            <Message negative>
              <p>A collection with that name already exists</p>
            </Message>
          ) : (
            ""
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={this.handleClose}>
            Cancel
          </Button>
          <Button
            positive
            disabled={
              this.state.collections.includes(this.state.value) ? true : false
            }
            icon="checkmark"
            labelPosition="right"
            content="Yes"
            onClick={() => this.handleClick()}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps, { addCollection })(
  CreateCollectionModal
);
