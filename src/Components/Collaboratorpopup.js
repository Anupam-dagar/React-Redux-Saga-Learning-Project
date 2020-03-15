import React, { Component } from "react";
import { connect } from "react-redux";
import { Popup, Icon, Input, Button, List, Message } from "semantic-ui-react";
import { updateUserCollection } from "../actions/collectionsactions";

class CollaboratorPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      value: "",
      collectionId: this.props.collectionId,
      collaborators: this.props.collaborators,
      collectionOwner: this.props.collectionOwner
    };
  }

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleClick() {
    this.props.updateUserCollection(
      { add_collaborator_email: this.state.value },
      this.state.collectionId
    );
    this.setState({ value: "" });
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  removeCollaborator(email) {
    this.props.updateUserCollection(
      { remove_collaborator_email: email },
      this.state.collectionId
    );
  }

  componentDidUpdate() {
    if (this.props.updatedCollaborators) {
      if (
        this.state.collaborators !==
        this.props.updatedCollaborators.collaborators
      ) {
        this.setState({
          collaborators: this.props.updatedCollaborators.collaborators
        });
      }
    }
  }

  render() {
    return (
      <Popup
        trigger={
          <Button icon labelPosition="right" compact circular>
            Add or Remove collaborator <Icon name="add" />
          </Button>
        }
        on="click"
        open={this.state.isOpen}
        onClose={this.handleClose}
        onOpen={this.handleOpen}
        position="right center"
      >
        <List selection verticalAlign="middle">
          {this.state.collaborators.map((collaborator, index) => (
            <List.Item key={index}>
              <Icon name="folder" size="large" />
              <List.Content>
                <List.Header>
                  {collaborator.username} - {collaborator.email}
                </List.Header>
              </List.Content>
              {collaborator.id !== this.state.collectionOwner ? (
                <Icon
                  onClick={() => this.removeCollaborator(collaborator.email)}
                  name="close"
                  color="red"
                  size="large"
                />
              ) : (
                <Icon
                  style={{ color: "#FFBB48" }}
                  name="chess queen"
                  size="large"
                />
              )}
            </List.Item>
          ))}

          <List.Item>
            <List.Content>
              <List.Header>
                Add Collaborator
                <Input
                  icon={
                    <Icon
                      name="check"
                      color="green"
                      inverted
                      circular
                      link
                      onClick={() => this.handleClick()}
                    />
                  }
                  placeholder="Enter email of collaborator"
                  value={this.state.value}
                  onChange={e => this.handleChange(e)}
                />
                {this.props.error && 
                  <Message negative>
                    <p>{this.props.error}</p>
                  </Message>
                }
              </List.Header>
            </List.Content>
          </List.Item>
        </List>
      </Popup>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  updatedCollaborators: state.collections.collection,
  error: state.collections.error
});

export default connect(mapStateToProps, { updateUserCollection })(
  CollaboratorPopup
);
