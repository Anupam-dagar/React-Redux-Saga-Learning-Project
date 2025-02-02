import React, { Component } from "react";
import { Button, Modal, Icon, Grid, Menu, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import PaginationBar from "./Paginationbar";
import { getAllRestaurants } from "../actions/restaurantactions";
import Searchinput from "./Searchinput";
import { websocketAddMessage } from "../actions/websocketactions";
import { bindActionCreators } from "redux";

class RestaurantModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      collectionId: this.props.collectionId
    };
  }

  handleOpen = () => {
    this.props.getAllRestaurants(1);
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  addRestaurantToCollection(id) {
    const { dispatch } = this.props;
    dispatch(
      websocketAddMessage({
        collectionId: this.state.collectionId,
        restaurantId: id
      })
    );
  }

  render() {
    return (
      <Modal
        onOpen={this.handleOpen}
        onClose={this.handleClose}
        open={this.state.isOpen}
        trigger={
          <Button icon labelPosition="right" compact circular>
            Add a restaurant <Icon name="add" />
          </Button>
        }
      >
        <Modal.Header>
          <Menu secondary>
            <Menu.Item header>Add Restaurant to Collection</Menu.Item>
            <Menu.Menu position="right">
              <Searchinput />
            </Menu.Menu>
          </Menu>
        </Modal.Header>
        <Modal.Content>
          <Modal.Description>
            {this.props.addError && (
              <Message negative>
                <Message.Header>{this.props.addError}</Message.Header>
                <p>Please check if the restaurant is already present in collection.</p>
              </Message>
            )}
            <Grid columns={3} padded="vertically">
              {this.props.data &&
                this.props.data.map((value, index) => (
                  <Grid.Column>
                    <Button
                      fluid
                      icon
                      labelPosition="right"
                      circular
                      onClick={() => this.addRestaurantToCollection(value.id)}
                    >
                      {value.restaurant.name}
                      {(this.props.addedCollection && this.props.addedCollection.restaurant.restaurant.name === value.restaurant.name && this.props.addedCollection.restaurant_collection.id === this.state.collectionId) && <Icon style={{background:"green"}} name='check' />}
                    </Button>
                  </Grid.Column>
                ))}
            </Grid>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <PaginationBar />
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  prev: state.restaurant.restaurants.prev,
  next: state.restaurant.restaurants.next,
  count: state.restaurant.restaurants.count,
  data: state.restaurant.restaurants.results,
  error: state.restaurant.error,
  addError: state.collections.error,
  addedCollection: state.collections.addedCollection
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ getAllRestaurants }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantModal);
