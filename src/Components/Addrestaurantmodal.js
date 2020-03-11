import React, { Component } from "react";
import { Button, Modal, Icon, Grid, Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import PaginationBar from "./Paginationbar";
import { getAllRestaurants } from "../actions/restaurantactions";
import {
  addRestaurantCollection,
  getCollections
} from "../actions/collectionsactions";
import Searchinput from "./Searchinput";

class RestaurantModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      collectionId: this.props.collectionId
    };
  }
  componentDidUpdate() {
    console.log(this.props);
  }

  handleOpen = () => {
    this.props.getAllRestaurants(1);
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

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
            <Grid columns={3} padded="vertically">
              {this.props.data &&
                this.props.data.map((value, index) => (
                  <Grid.Column>
                    <Button
                      fluid
                      icon
                      labelPosition="right"
                      circular
                      onClick={e => {
                        this.props.addRestaurantCollection(
                          this.state.collectionId,
                          value.id
                        );
                      }}
                    >
                      {value.restaurant.name}
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
  error: state.restaurant.error
});

export default connect(mapStateToProps, {
  getAllRestaurants,
  addRestaurantCollection,
  getCollections
})(RestaurantModal);
