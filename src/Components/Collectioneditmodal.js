import React, { Component } from "react";
import { connect } from "react-redux";
import { Popup, Icon, Input, Label, Message, Header } from "semantic-ui-react";
import { websocketEditMessage } from "../actions/websocketactions";

class CollectionEditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      value: "",
      collectionId: this.props.collectionId,
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
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleClick() {
    const { dispatch } = this.props;
    dispatch(
      websocketEditMessage({
        name: this.state.value,
        id: this.state.collectionId
      })
    );
    this.setState({ value: "" });
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <Popup
        trigger={
          <Label
            as="a"
            style={{ float: "right" }}
            content="Edit"
            icon="edit"
            circular
          />
        }
        on="click"
        open={this.state.isOpen}
        onClose={this.handleClose}
        onOpen={this.handleOpen}
        position="left center"
      >
        <Header>Edit collection name</Header>
        <Input
          focus
          icon={
            this.state.collections.includes(this.state.value) ? (
              ""
            ) : (
              <Icon
                name="check"
                color="green"
                inverted
                circular
                link
                onClick={() => this.handleClick()}
              />
            )
          }
          placeholder="Enter Collection name"
          value={this.state.value}
          onChange={e => this.handleChange(e)}
        />
        {this.state.collections.includes(this.state.value) ? (
          <Message negative>
            <p>A collection with that name already exists</p>
          </Message>
        ) : (
          ""
        )}
      </Popup>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps, null)(
  CollectionEditModal
);
