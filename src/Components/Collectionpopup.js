import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Popup, Icon, List, Input, Message } from "semantic-ui-react";
import {
  addCollection,
  getCollections,
  addRestaurantCollection,
  getRestaurantCollection,
  deleteRestaurantInCollection
} from "../actions/collectionsactions";
import Spinner from "./Spinner";
class Collectionpopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      value: "",
      collections: [],
      restaurantId: this.props.restaurantId,
      partOfCollections: []
    };
  }

  handleOpen = () => {
    this.props.getCollections(this.props.currentUser.id);
    this.props.getRestaurantCollection(
      this.props.currentUser.id,
      this.state.restaurantId
    );
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleClick() {
    this.props.addCollection(this.props.currentUser.id, this.state.value);
    this.setState({ value: "" });
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  deleteFromCollection(userId, collectionName, restaurantId) {
    this.props.deleteRestaurantInCollection(
      userId,
      collectionName,
      restaurantId
    );
    this.setState({ isOpen: false });
  }

  addToCollection(collection, collectionName) {
    this.props.addRestaurantCollection(collection.id, this.state.restaurantId);
    this.setState({
      partOfCollections: [...this.state.partOfCollections, collectionName]
    });
  }

  collectionValidation() {
    for (let i = 0; i < this.state.collections.length; i++) {
      if (
        this.state.value === this.state.collections[i].name &&
        this.state.collections[i].user.username ===
          this.props.currentUser.username
      ) {
        console.log(
          this.state.value,
          this.state.collections[i].name,
          this.state.collections[i].user.username,
          this.props.currentUser.username,
          "fasndk"
        );
        return true;
      }
    }
    return false;
  }

  componentDidUpdate(newprops) {
    if (newprops.collections !== this.props.collections) {
      this.setState({ collections: this.props.collections });
    }
    if (newprops.newCollection !== this.props.newCollection) {
      this.setState({
        collections: [...this.state.collections, this.props.newCollection]
      });
    }
    if (newprops.partOfCollections !== this.props.partOfCollections) {
      this.setState({ partOfCollections: this.props.partOfCollections });
    }
  }

  render() {
    return (
      <Popup
        trigger={
          <Button icon labelPosition="right" compact circular>
            {this.props.content} <Icon name="add" />
          </Button>
        }
        on="click"
        open={this.state.isOpen}
        onClose={this.handleClose}
        onOpen={this.handleOpen}
        position="right center"
      >
        <List selection verticalAlign="middle">
          <List.Item style={{color:"black"}}>
            Add restaurant to collection
          </List.Item>
          {this.props.isLoading ? (
            <Spinner />
          ) : (
            this.state.collections.map((collection, index) => (
              <List.Item
                key={index}
                onClick={() => {
                  if (this.state.partOfCollections.includes(collection.name)) {
                    this.deleteFromCollection(
                      this.props.currentUser.id,
                      collection.name,
                      this.state.restaurantId
                    );
                  } else {
                    this.addToCollection(collection, collection.name);
                  }
                }}
              >
                <Icon name="folder" size="large" />
                <List.Content>
                  <List.Header>{collection.name}</List.Header>
                </List.Content>
                {this.state.partOfCollections.includes(collection.name) && (
                  <Icon name="check" color="green" size="large" />
                )}
              </List.Item>
            ))
          )}

          <List.Item>
            <List.Content>
              <span style={{color:"black"}}>Create New Collection</span>
              <List.Header>
                <Input
                  icon={
                    this.collectionValidation() ? (
                      ""
                    ) : (
                      <Icon
                        name="add"
                        inverted
                        circular
                        link
                        onClick={() => this.handleClick()}
                      />
                    )
                  }
                  placeholder="Create Collection"
                  value={this.state.value}
                  onChange={e => this.handleChange(e)}
                />
                {this.collectionValidation() ? (
                  <Message negative>
                    <p>A collection with that name already exists</p>
                  </Message>
                ) : (
                  ""
                )}
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
  collections: state.collections.collections.results,
  newCollection: state.collections.newCollection,
  isLoading: state.collections.isLoading,
  partOfCollections: state.collections.partOfCollections
});

export default connect(mapStateToProps, {
  addCollection,
  getCollections,
  addRestaurantCollection,
  getRestaurantCollection,
  deleteRestaurantInCollection
})(Collectionpopup);
